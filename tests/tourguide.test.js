import TourGuide from '../src/tourguide';

describe('TourGuide', () => {
  test('Check gameControl gamepads', () => {
    const tour = new TourGuide();
    expect(tour).not.toEqual(null);
  });
});
