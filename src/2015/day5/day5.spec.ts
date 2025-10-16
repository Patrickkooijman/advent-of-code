import { isNiceAdvancedString, isNiceString } from './';

describe('day 5', () => {
  describe('challenge one', () => {
    test.each([
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
    test.each([
      ['qjhvhtzxzqqjkmpb', true],
      ['xxyxx', true],
      ['uurcxstgmygtbstg', false],
      ['ieodomkazucvgmuy', false],
    ])('%s should result in %o', (test: string, result: boolean) => {
      expect(isNiceAdvancedString(test)).toBe(result);
    });
  });
});
