/**
SpotlightJS: a highlighting/instructions plugin for JS.
Developed by Alvaro Montoro. More info: https://github.com/alvaromontoro/spotlightjs
**/
class SpotlightJS {

  constructor(options) {
    this.init = "";
    this.shape = "round";
    this.color = "rgba(0,0,0,0.4)";
    this.skip = true;
    this.skipText = "Skip presentation";
    this.previous = true;
    this.previousText = "Previous";
    this.next = true;
    this.nextText = "Next";
    this.timer = 0;
    this.current = 0;
    this.steps = [];
    this.initTrigger = false;
    this.frame = null;
    this.spot = null;
    this.text = null;
    this.textContent = null;
    this.previousButton = null;
    this.nextButton = null;

    // extend the options that can be customized
    if (options) {
      if (options.init) { this.init = options.init; }
      if (options.shape) { this.shape = options.shape == "square" ? "square" : "round"; }
      if (options.hasOwnProperty("skip")) { this.skip = (options.skip == true); }
      if (options.hasOwnProperty("previous")) { this.previous = (options.previous == true); }
      if (options.hasOwnProperty("next")) { this.next = (options.next == true); }
      if (options.hasOwnProperty("initTrigger")) { this.initTrigger = (options.initTrigger == true); }
      if (options.skipText) { this.skipText = options.skipText; }
      if (options.previousText) { this.previousText = options.previousText; }
      if (options.nextText) { this.nextText = options.nextText; }
      if (options.steps) { this.steps = options.steps; }
      if (options.color) { this.color = options.color; }
    }

    // create a list of selectors for the elements to get the spotlight (if none exists yet)
    if (this.init != "" && !this.hasSteps()) {
      let el = this.init;
      while (el) {
        let elObj = document.querySelector(el);
        this.steps.push({
          selector: el,
          text: elObj.dataset.spText || "",
          shape: elObj.dataset.spShape || ""
        });
        el = document.querySelector(el).dataset.spNext;
      }
    }

    // remove html structure if already existing
    let oldSpInst = document.querySelector("#spjs-frame")
    if (oldSpInst) {
      document.querySelector("body").removeChild(oldSpInst);
    }

    // create the html structure needed for the spotlight
    let spInst = document.createElement("div");
    spInst.id = "spjs-frame";
    let spSpot = document.createElement("div");
    spSpot.id = "spjs-spot";
    spSpot.classList.add("spjs-" + this.shape);
    spSpot.style.color = this.color;
    let spText = document.createElement("div");
    spText.id = "spjs-text";
    let spTextContent = document.createElement("span");
    spTextContent.id = "spjs-textContent";
    spText.appendChild(spTextContent);
    if (this.skip) {
      let spSkip = document.createElement("span");
      spSkip.innerHTML = this.skipText;
      spSkip.id = "spjs-skip";
      spSkip.addEventListener("click", this.stop);
      spInst.appendChild(spSkip)
    }
    if (this.previous) {
      let spPrev = document.createElement("span");
      spPrev.innerHTML = this.previousText;
      spPrev.addEventListener("click", this.goToPreviousStep);
      spText.appendChild(spPrev);
      this.previousButton = spPrev;
    }
    if (this.next) {
      let spNext = document.createElement("span");
      spNext.innerHTML = this.nextText;
      spNext.addEventListener("click", this.goToNextStep);
      spText.appendChild(spNext);
      this.nextButton = spNext;
    }
    spSpot.appendChild(spText);
    spInst.appendChild(spSpot);
    document.querySelector("body").appendChild(spInst);
    this.frame = spInst;
    this.spot = spSpot;
    this.text = spText;
    this.textContent = spTextContent;

    // if window is resized of scrolled, recalculate
    let $this = this;
    window.addEventListener("resize", function() { $this.goToStep($this.current); });
    window.addEventListener("scroll", function() { $this.goToStep($this.current); });

    // make the plugin initialize automatically on click of first element
    if (this.initTrigger) {
      document.querySelector(this.init).addEventListener("click", this.start);
    }
  }

  hideSpotlight = () => {
    this.frame.style.display = "none";
    let body = document.querySelector('body');
    body.classList.remove('hideScrollY');
  }

  showSpotlight = () => {
    let body = document.querySelector('body');
    this.frame.style.display = "block";
    body.classList.add('hideScrollY');
  }

  /** start with the first step of the instructions */
  start = () => {
    if (this.hasSteps()) {
      this.showSpotlight();
      this.goToFirstStep();
    }
  }

  /** end the instructions: hide everything */
  stop = () => {
    this.hideSpotlight();
  }

  /** go to the specified step in the instructions */
  goToStep = (step) => {
    if (this.hasSteps()) {
      if (!isNaN(step) && step > -1 && step < this.steps.length) {
        this.spot.classList.remove("spjs-step-"+this.current, "spjs-step-square", "spjs-step-round");
        this.current = step;
        let el = document.querySelector(this.steps[step].selector);
        if (el) {
          let elRect = el.getBoundingClientRect();
          this.spot.style.width = (elRect.width + 20) + "px";
          this.spot.style.height = (elRect.height + 20) + "px";
          this.spot.style.top = (elRect.top + elRect.height/2) + "px";
          this.spot.style.left = (elRect.left + elRect.width/2) + "px";
          this.spot.classList.add("spjs-step-" + step); // to allow user styling specific to each step
          this.textContent.textContent = this.steps[step].text;
          if (this.previousButton)
            this.previousButton.style.display = this.current == 0 ? "none" : "inline-block";
          if (this.steps[step].shape)
            this.spot.classList.add("spjs-step-" + this.steps[step].shape);
        }
      }
    }
  }

  /** go to the first step of the instructions */
  goToFirstStep = () => {
    this.goToStep(0);
  }

  /** go to the next step of the instructions */
  goToNextStep = () => {
    if (this.current == this.steps.length - 1) {
      this.stop();
    }
    if (this.current < this.steps.length) {
      this.goToStep(this.current + 1);
    }
  }

  /** go to the next step of the instructions */
  goToPreviousStep = () => {
    if (this.current > 0) {
      this.goToStep(this.current - 1);
    }
  }

  /** indicates if the instructions have any steps to show (as a whole) */
  hasSteps = () => (this.init != "" && this.steps.length > 0);

  /** returns the identifier of the current element */
  currentElementSelector = () => this.steps[this.current].selector;

  /** returns the currently highlighted element */
  currentElement = () => document.querySelector(this.currentElementSelector());

  /** returns the text of the currently highlighted element */
  getText = () => this.steps[this.current].text;

  /** returns the current step */
  getStep = () => this.current + 1;

  /** returns the total number of steps */
  getTotalSteps = () => this.steps.length + 1;
};
