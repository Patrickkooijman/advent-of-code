import Day from './index';

describe('day 5', () => {
  describe('challenge one', () => {
    it('should result in CMZ', () => {
      expect(
        new Day().challengeOneHandler(
          `    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
        )
      ).toBe('CMZ');
    });
  });

  describe('challenge two', () => {
    it('should result in 70', () => {
      expect(
        new Day().challengeTwoHandler(
          `    [D]
[N] [C]
[Z] [M] [P]
1   2   3

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2`
        )
      ).toBe('MCD');
    });
  });
});
