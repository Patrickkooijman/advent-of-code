import { Day3 } from './index';

describe('day 3', () => {
  describe('challenge one', () => {
    it('should result in 157', () => {
      expect(
        new Day3().challengeOneHandler(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)
      ).toBe(157);
    });
  });

  describe('challenge two', () => {
    it('should result in 70', () => {
      expect(
        new Day3().challengeTwoHandler(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)
      ).toBe(70);
    });
  });
});
