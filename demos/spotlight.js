"use strict";

/**
SpotlightJS: a highlighting/instructions plugin for JS
Developed by Alvaro Montoro (alvaromontoro@gmail.com)
More info: https://github.com/alvaromontoro/spotlightjs
**/
var SpotlightJS = function SpotlightJS(options) {
  var _this = this;

  this.hideSpotlight = function () {
    _this.frame.style.display = "none";
    var body = document.querySelector('body');
    body.classList.remove('hideScrollY');
  };
  
  this.showSpotlight = function () {
    var body = document.querySelector('body');
    _this.frame.style.display = "block";
    body.classList.add('hideScrollY');
  };

	// starts the spotlight from the first step
  this.start = function () {
    if (_this.hasSteps()) {
      _this.showSpotlight();
      _this.goToFirstStep();
    }
  };

  // stops the spotlight
  this.stop = function () {
    _this.hideSpotlight();
  };

  // animates to the indicated step
  this.goToStep = function (step) {
    if (_this.hasSteps()) {
      if (!isNaN(step) && step > -1 && step < _this.steps.length) {
        _this.spot.classList.remove("spjs-step-" + _this.current, "spjs-step-square", "spjs-step-round");
        _this.current = step;
        var el = document.querySelector(_this.steps[step].selector);
        if (el) {
          var elRect = el.getBoundingClientRect();
          _this.spot.style.width = elRect.width + 20 + "px";
          _this.spot.style.height = elRect.height + 20 + "px";
          _this.spot.style.top = (elRect.top + elRect.height/2) + "px";
          _this.spot.style.left = (elRect.left + elRect.width/2) + "px";
          _this.spot.classList.add("spjs-step-" + step); // to allow user styling specific to each step
          _this.textContent.textContent = _this.steps[step].text;
          if (_this.previousButton) _this.previousButton.style.display = _this.current == 0 ? "none" : "inline-block";
          if (_this.steps[step].shape) _this.spot.classList.add("spjs-step-" + _this.steps[step].shape);
        }
      }
    }
  };

  // animates to the first step
  this.goToFirstStep = function () {
    _this.goToStep(0);
  };

  // animates to the next step or ends spotlight if in last step
  this.goToNextStep = function () {
    if (_this.current == _this.steps.length - 1) {
      _this.stop();
    }
    if (_this.current < _this.steps.length) {
      _this.goToStep(_this.current + 1);
    }
  };

  // animates back to the previous step
  this.goToPreviousStep = function () {
    if (_this.current > 0) {
      _this.goToStep(_this.current - 1);
    }
  };

  // indicates if the instructions have any step in them
  this.hasSteps = function () {
    return _this.init != "" && _this.steps.length > 0;
  };

  // returns the selector for the element that is being highlighted
  this.currentElementSelector = function () {
    return _this.steps[_this.current].selector;
  };

  // returns the DOM element that is being highlighted at the moment
  this.currentElement = function () {
    return document.querySelector(_this.currentElementSelector());
  };

  // returns the text associated to the current step
  this.getText = function () {
    return _this.steps[_this.current].text;
  };

  // returns the current step (1..n)
  this.getStep = function () {
    return _this.current + 1;
  };

  // returns the total number of steps in the instructions
  this.getTotalSteps = function () {
    return _this.steps.length + 1;
  };

  // initial variables with default values
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
    if (options.init) {
      this.init = options.init;
    }
    if (options.shape) {
      this.shape = options.shape == "square" ? "square" : "round";
    }
    if (options.hasOwnProperty("skip")) {
      this.skip = options.skip == true;
    }
    if (options.hasOwnProperty("previous")) {
      this.previous = options.previous == true;
    }
    if (options.hasOwnProperty("next")) {
      this.next = options.next == true;
    }
    if (options.hasOwnProperty("initTrigger")) {
      this.initTrigger = options.initTrigger == true;
    }
    if (options.skipText) {
      this.skipText = options.skipText;
    }
    if (options.previousText) {
      this.previousText = options.previousText;
    }
    if (options.nextText) {
      this.nextText = options.nextText;
    }
    if (options.steps) {
      this.steps = options.steps;
    }
    if (options.color) {
      this.color = options.color;
    }
  }

  // create a list of selectors for the elements to get the spotlight (if none exists yet)
  if (this.init != "" && !this.hasSteps()) {
    var el = this.init;
    while (el) {
      var elObj = document.querySelector(el);
      this.steps.push({
        selector: el,
        text: elObj.dataset.spText || "",
        shape: elObj.dataset.spShape || ""
      });
      el = document.querySelector(el).dataset.spNext;
    }
  }

  // remove html structure if already existing
  var oldSpInst = document.querySelector("#spjs-frame");
  if (oldSpInst) {
    document.querySelector("body").removeChild(oldSpInst);
  }

  // create the html structure needed for the spotlight
  var spInst = document.createElement("div");
  spInst.id = "spjs-frame";
  var spSpot = document.createElement("div");
  spSpot.id = "spjs-spot";
  spSpot.classList.add("spjs-" + this.shape);
  spSpot.style.color = this.color;
  var spText = document.createElement("div");
  spText.id = "spjs-text";
  var spTextContent = document.createElement("span");
  spTextContent.id = "spjs-textContent";
  spText.appendChild(spTextContent);
  if (this.skip) {
    var spSkip = document.createElement("span");
    spSkip.innerHTML = this.skipText;
    spSkip.id = "spjs-skip";
    spSkip.addEventListener("click", this.stop);
    spInst.appendChild(spSkip);
  }
  if (this.previous) {
    var spPrev = document.createElement("span");
    spPrev.innerHTML = this.previousText;
    spPrev.addEventListener("click", this.goToPreviousStep);
    spText.appendChild(spPrev);
    this.previousButton = spPrev;
  }
  if (this.next) {
    var spNext = document.createElement("span");
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
  var $this = this;
  window.addEventListener("resize", function () {
    $this.goToStep($this.current);
  });
  window.addEventListener("scroll", function () {
    $this.goToStep($this.current);
  });

  // make the plugin initialize automatically on click
  if (this.initTrigger) {
    document.querySelector(this.init).addEventListener("click", this.start);
  }
};
