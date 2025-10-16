import Day from './index';
describe('day 8', () => {
  describe('challenge one', () => {
    test('should result in 21', () => {
      expect(
        new Day().challengeOneHandler(`30373
25512
65332
33549
35390`)
      ).toBe(21);
    });
  });

  describe('challenge two', () => {
    test('should result in 8', () => {
      expect(
        new Day().challengeTwoHandler(`30373
25512
65332
33549
35390`)
      ).toBe(8);
    });
  });
});
