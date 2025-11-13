import { challengeOneHandler, challengeTwoHandler } from './index.ts';

describe('day 1', () => {
  describe('challenge one', () => {
    it.each([
      ['(())', 0],
      ['()()', 0],
      ['(((', 3],
      ['(()(()(', 3],
      ['))(((((', 3],
      ['())', -1],
      ['))(', -1],
      [')))', -3],
      [')())())', -3],
    ])('%s should result in %i', (test: string, result: number) => {
      expect(challengeOneHandler(test)).toBe(result);
    });
  });

  describe('challenge two', () => {
    it.each([
      [')', 1],
      ['()()))', 5],
    ])('%s should result in %i', (test: string, result: number) => {
      expect(challengeTwoHandler(test)).toBe(result);
    });
  });
});
