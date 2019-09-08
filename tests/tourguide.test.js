import TourGuide from '../src/tourguide';

const steps = [
  {
    selector: '#hello',
    text: 'This is the first step.',
    shape: ''
  },
  {
    selector: '#step-2',
    text: 'Just a few more steps...',
    shape: ''
  },
  {
    selector: '#step-3',
    text: 'Almost there...',
    shape: 'round'
  },
  {
    selector: '#bye',
    text: 'You made it till the end!',
    shape: ''
  }
];

describe('TourGuide', () => {
  test('TourGuide is created with default values', () => {
    const tour = new TourGuide();
    expect(tour).not.toEqual(null);
    expect(tour.shape).toEqual('round');
  });

  test('TourGuide created with custom values', () => {
    const tour = new TourGuide({
      color: 'red',
      initTrigger: false,
      next: false,
      nextText: 'no next text',
      previous: false,
      previousText: 'no previous text',
      shape: 'square',
      skip: false,
      skipText: 'no text',
      steps: {}
    });
    expect(tour).not.toEqual(null);
    expect(tour.shape).toEqual('square');
    expect(tour.skip).toEqual(false);
    expect(tour.previous).toEqual(false);
    expect(tour.next).toEqual(false);
    expect(tour.color).toEqual('red');
  });

  // /** returns the total number of steps */
  // getTotalSteps = () => this.steps.length + 1;

  test('check hasSteps method', () => {
    const tour = new TourGuide();
    expect(tour.hasSteps()).toEqual(false);
  });

  test('check getCurrentElementSelector method', () => {
    const tour = new TourGuide({ steps });
    expect(tour.getCurrentElementSelector()).toEqual('#hello');
  });

  test('check getCurrentElement method', () => {
    const tour = new TourGuide({ steps });
    expect(tour.getCurrentElement()).toEqual(null);
  });

  test('check getText method', () => {
    const tour = new TourGuide({ steps });
    expect(tour.getText()).toEqual('This is the first step.');
  });

  test('check getStep method', () => {
    const tour = new TourGuide();
    expect(tour.getStep()).toEqual(1);
  });

  test('check getStep method (with steps)', () => {
    const tour = new TourGuide({ steps });
    expect(tour.getStep()).toEqual(1);
  });

  test('check getTotalSteps method', () => {
    const tour = new TourGuide();
    expect(tour.getTotalSteps()).toEqual(0);
  });

  test('check getTotalSteps method (with steps)', () => {
    const tour = new TourGuide({ steps });
    expect(tour.getTotalSteps()).toEqual(4);
  });

  test('move forward in the tour (with steps)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToNextStep();
    expect(tour.getStep()).toEqual(3);
  });

  test('move backwards in the tour (with steps)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToPreviousStep();
    expect(tour.getStep()).toEqual(1);
  });

  test('move forward in the tour (force stop)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    expect(tour.getStep()).toEqual(4);
  });

  test('move backwards in the tour (force stop)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToPreviousStep();
    tour.goToPreviousStep();
    expect(tour.getStep()).toEqual(1);
  });

  test('move forward in the tour multiple (force stop)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    expect(tour.getStep()).toEqual(4);
  });

  test('move backwards in the tour (force stop)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToPreviousStep();
    tour.goToPreviousStep();
    expect(tour.getStep()).toEqual(1);
  });

  test('move forward in the tour (exceed steps)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    tour.goToNextStep();
    expect(tour.getStep()).toEqual(4);
  });

  test('move backwards in the tour (exceed steps)', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToPreviousStep();
    tour.goToPreviousStep();
    tour.goToPreviousStep();
    expect(tour.getStep()).toEqual(1);
  });

  test('goToFirstStep', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.goToNextStep();
    tour.goToNextStep();
    expect(tour.getStep()).toEqual(3);
    tour.goToFirstStep();
    expect(tour.getStep()).toEqual(1);
  });

  test('start animation', () => {
    const tour = new TourGuide({ init: '#hello', steps: steps });
    tour.start();
  });

  test('window resize', () => {
    const tour = new TourGuide();
    global.innerWidth = 500;
    global.dispatchEvent(new Event('resize'));
  });

  test('window scroll', () => {
    const tour = new TourGuide();
    global.dispatchEvent(new Event('scroll'));
  });

  test('initTrigger to true', () => {
    document.body.innerHTML = '<button id="start" />';
    const tour = new TourGuide({ init: '#start', initTrigger: true, steps });
  });

  test('full DOM test', () => {
    document.body.innerHTML = `
    <div id="hello" data-sp-next="#step-2" data-sp-text="This is the first step.">
      Hello! Ready to start? Click here!
    </div>
    <div id="step-2" data-sp-next="#step-3" data-sp-shape="square" data-sp-text="Just a few more steps...">
      This is a small plugin that allows the easy creation of spotlights that could be useful for
      small presentations, demos, or instructions.
    </div>
    <div id="step-3" data-sp-next="#bye" data-sp-text="Almost there..." data-sp-shape="round">
      It is customizable. User can select shapes, colors, messages to be displayed...
    </div>
    <div id="bye" data-sp-text="You made it till the end!">
      Bye! This was the end of the presentation
    </div>`;

    const tour = new TourGuide({ init: '#hello' });
    tour.start();
    tour.goToNextStep();
  });
});
