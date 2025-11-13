import { isNiceAdvancedString, isNiceString } from './index.ts';

describe('day 5', () => {
  describe('challenge one', () => {
    it.each([
      ['ugknbfddgicrmopn', true],
      ['aaa', true],
      ['jchzalrnumimnmhp', false],
      ['haegwjzuvuyypxyu', false],
      ['dvszwmarrgswjxmb', false],
    ])('%s should result in %o', (test: string, result: boolean) => {
      expect(isNiceString(test)).toBe(result);
    });
  });

  describe('challenge two', () => {
    it.each([
      ['qjhvhtzxzqqjkmpb', true],
      ['xxyxx', true],
      ['uurcxstgmygtbstg', false],
      ['ieodomkazucvgmuy', false],
    ])('%s should result in %o', (test: string, result: boolean) => {
      expect(isNiceAdvancedString(test)).toBe(result);
    });
  });
});
