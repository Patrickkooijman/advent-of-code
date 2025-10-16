import { Day4 } from './index';

describe('day 4', () => {
  describe('challenge one', () => {
    test('should result in 157', () => {
      expect(
        new Day4().challengeOneHandler(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)
      ).toBe(2);
    });
  });

  describe('challenge two', () => {
    test('should result in 70', () => {
      expect(
        new Day4().challengeTwoHandler(`2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`)
      ).toBe(4);
    });
  });
});
