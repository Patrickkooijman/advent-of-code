import Day from './index';

describe('day 9', () => {
  describe('challenge one', () => {
    it('should result in 13', () => {
      expect(
        new Day().challengeOneHandler(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)
      ).toBe(13);
    });
  });

  describe('challenge two', () => {
    it('should result in 1', () => {
      expect(
        new Day().challengeTwoHandler(`R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`)
      ).toBe(1);
    });

    it('should result in 36', () => {
      expect(
        new Day().challengeTwoHandler(`R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20`)
      ).toBe(36);
    });
  });
});
