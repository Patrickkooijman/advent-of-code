import Day from './index';

describe('day 14', () => {
  describe('challenge one', () => {
    it('should result in 24', () => {
      expect(
        new Day().challengeOneHandler(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`)
      ).toBe(24);
    });
  });

  describe('challenge two', () => {
    it('should result in 93', () => {
      expect(
        new Day().challengeTwoHandler(`498,4 -> 498,6 -> 496,6
503,4 -> 502,4 -> 502,9 -> 494,9`)
      ).toBe(93);
    });
  });
});
