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

  test('check getTotalSteps method (with steps)', () => {
    const tour = new TourGuide({ steps });
    expect(tour.getTotalSteps()).toEqual(4);
  });

  // test('', () => {
  //   const tour = new TourGuide();
  // });
});
