import { Day2 } from './index.ts';

describe('day 2', () => {
  describe('challenge one', () => {
    it('should result in 15', () => {
      expect(
        new Day2().challengeOneHandler(`A Y
B X
C Z`)
      ).toBe(15);
    });
  });

  describe('challenge two', () => {
    it('should result in 12', () => {
      expect(
        new Day2().challengeTwoHandler(`A Y
B X
C Z`)
      ).toBe(12);
    });
  });
});
