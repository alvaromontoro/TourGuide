import TourGuide from '../src/tourguide';
import { read } from 'fs';

describe('TourGuide', () => {
  test('TourGuide is created with default values', () => {
    const tour = new TourGuide();
    expect(tour).not.toEqual(null);
    expect(tour.shape).toEqual('round');
  });

  test('TourGuide created with custom values', () => {
    const tour = new TourGuide({
      color: read,
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
  });
});
