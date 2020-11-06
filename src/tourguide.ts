/**
TourGuide: a highlighting/instructions plugin for JS.
Developed by Alvaro Montoro. More info: https://github.com/alvaromontoro/TourGuide
**/
import './tourguide.scss';

interface Options {
  color?: string;
  current?: number;
  frame?: HTMLDivElement | null;
  init: string;
  initTrigger?: boolean;
  next?: boolean;
  nextButton?: HTMLButtonElement | null;
  nextText?: string;
  previous?: boolean;
  previousButton?: HTMLButtonElement | null;
  previousText?: string;
  shape?: string;
  skip?: boolean;
  skipText?: string;
  spot?: HTMLDivElement | null;
  steps?: Steps[];
  text?: HTMLDivElement | null;
  textContent?: HTMLSpanElement | null | string;
  timer?: number;
}

interface Steps {
  selector: string;
  shape: string;
  text: string;
}

export default class TourGuide {
  defaultOptions: Options = {
    color: 'rgba(0,0,0,0.4)',
    current: 0,
    frame: null,
    init: '',
    initTrigger: false,
    next: true,
    nextText: 'Next',
    previous: true,
    previousText: 'Previous',
    nextButton: null,
    previousButton: null,
    shape: 'round',
    skip: true,
    skipText: 'Skip presentation',
    spot: null,
    steps: [],
    text: null,
    textContent: null,
    timer: 0
  };
  options: Options;

  constructor(options: Options) {
    this.options = {
      ...this.defaultOptions,
      ...options
    };

    // create a list of selectors for the elements to get the spotlight (if none exists yet)
    if (this.options.init !== '' && !this.hasSteps()) {
      let element = this.options.init;

      while (element) {
        const elementObj = document.querySelector(element);

        if (elementObj instanceof HTMLElement) {
          this.options.steps?.push({
            selector: element,
            shape: elementObj!.dataset.spShape || '',
            text: elementObj!.dataset.spText || ''
          });

          element = elementObj.dataset.spNext!;
        }
      }
    }

    // remove html structure if already existing
    let oldSpInst = document.querySelector('#spjs-frame');
    if (oldSpInst) {
      document.querySelector('body')!.removeChild(oldSpInst);
    }

    // create the html structure needed for the spotlight
    let spInst = document.createElement('div');
    spInst.id = 'spjs-frame';
    let spSpot = document.createElement('div');
    spSpot.id = 'spjs-spot';
    spSpot.classList.add('spjs-' + this.options.shape);
    spSpot.style.color = this.options.color!;
    let spText = document.createElement('div');
    spText.id = 'spjs-text';
    let spTextContent = document.createElement('span');
    spTextContent.id = 'spjs-textContent';
    spText.appendChild(spTextContent);

    if (this.options.skip) {
      let spSkip = document.createElement('span');
      spSkip.innerHTML = this.options.skipText!;
      spSkip.id = 'spjs-skip';
      spSkip.addEventListener('click', this.stop);
      spInst.appendChild(spSkip);
    }

    if (this.options.previous) {
      let spPrev = document.createElement('button');
      spPrev.innerHTML = this.options.previousText!;
      spPrev.addEventListener('click', this.goToPreviousStep);
      spText.appendChild(spPrev);
      this.options.previousButton = spPrev;
    }

    if (this.options.next) {
      let spNext = document.createElement('button');
      spNext.innerHTML = this.options.nextText!;
      spNext.addEventListener('click', this.goToNextStep);
      spText.appendChild(spNext);
      this.options.nextButton = spNext;
    }

    spSpot.appendChild(spText);
    spInst.appendChild(spSpot);
    document.querySelector('body')!.appendChild(spInst);

    this.options.frame = spInst;
    this.options.spot! = spSpot;
    this.options.text = spText;
    this.options.textContent = spTextContent;

    // if window is resized of scrolled, recalculate
    let $this = this;
    window.addEventListener('resize', function () {
      $this.goToStep($this.options.current!);
    });
    window.addEventListener('scroll', function () {
      $this.goToStep($this.options.current!);
    });

    // make the plugin initialize automatically on click of first element
    if (this.options.initTrigger) {
      document.querySelector(this.options.init)!.addEventListener('click', this.start);
    }
  }

  hideSpotlight = () => {
    this.options.frame!.style.display = 'none';
    let body = document.querySelector('body')!;
    body.classList.remove('hideScrollY');
  };

  showSpotlight = () => {
    let body = document.querySelector('body')!;
    this.options.frame!.style.display = 'block';
    body.classList.add('hideScrollY');
  };

  /** start with the first step of the instructions */
  start = () => {
    if (this.hasSteps()) {
      this.showSpotlight();
      this.goToFirstStep();
    }
  };

  /** end the instructions: hide everything */
  stop = () => {
    this.hideSpotlight();
  };

  /** go to the specified step in the instructions */
  goToStep = (step: number) => {
    if (this.hasSteps()) {
      if (!isNaN(step) && step > -1 && step < this.options.steps?.length!) {
        this.options.spot!.classList.remove(
          'spjs-step-' + this.options.current,
          'spjs-step-square',
          'spjs-step-round'
        );
        this.options.current = step;
        let el = document.querySelector(this.options.steps![step].selector);

        if (el) {
          let elRect = el.getBoundingClientRect();
          this.options.spot!.style.width = elRect.width + 20 + 'px';
          this.options.spot!.style.height = elRect.height + 20 + 'px';
          this.options.spot!.style.top = elRect.top + elRect.height / 2 + 'px';
          this.options.spot!.style.left = elRect.left + elRect.width / 2 + 'px';
          this.options.spot!.classList.add('spjs-step-' + step); // to allow user styling specific to each step
          this.options.textContent = this.options.steps![step].text;

          if (this.options.previousButton) {
            this.options.previousButton.style.display =
              this.options.current == 0 ? 'none' : 'inline-block';
          }

          if (this.options.steps![step].shape) {
            this.options.spot!.classList.add('spjs-step-' + this.options.steps![step].shape);
          }
        }
      }
    }
  };

  /** go to the first step of the instructions */
  goToFirstStep = () => {
    this.goToStep(0);
  };

  /** go to the next step of the instructions */
  goToNextStep = () => {
    if (this.options.current == this.options.steps!.length - 1) {
      this.stop();
    }
    if (this.options.current! < this.options.steps!.length) {
      this.goToStep(this.options.current! + 1);
    }
  };

  /** go to the next step of the instructions */
  goToPreviousStep = () => {
    if (this.options.current! > 0) {
      this.goToStep(this.options.current! - 1);
    }
  };

  /** indicates if the instructions have any steps to show (as a whole) */
  hasSteps = () => this.options.init != '' && this.options.steps!.length > 0;

  /** returns the identifier of the current element */
  getCurrentElementSelector = () => this.options.steps![this.options.current!].selector;

  /** returns the currently highlighted element */
  getCurrentElement = () => document.querySelector(this.getCurrentElementSelector());

  /** returns the text of the currently highlighted element */
  getText = () => this.options.steps![this.options.current!].text;

  /** returns the current step */
  getStep = () => this.options.current! + 1;

  /** returns the total number of steps */
  getTotalSteps = () => this.options.steps!.length;
}
