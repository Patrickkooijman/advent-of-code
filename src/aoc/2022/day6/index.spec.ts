import Day from './index.ts';

describe('day 6', () => {
  describe('challenge one', () => {
    it.each([
      ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 7],
      ['bvwbjplbgvbhsrlpgdmjqwftvncz', 5],
      ['nppdvjthqldpwncqszvftbrmjlhg', 6],
      ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 10],
      ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 11],
    ])('%s should result in %i', (test: string, result: number) => {
      expect(new Day().challengeOneHandler(test)).toBe(result);
    });
  });

  describe('challenge two', () => {
    it.each([
      ['mjqjpqmgbljsphdztnvjfqwrcgsmlb', 19],
      ['bvwbjplbgvbhsrlpgdmjqwftvncz', 23],
      ['nppdvjthqldpwncqszvftbrmjlhg', 23],
      ['nznrnfrfntjfmvfwmzdfjlvtqnbhcprsg', 29],
      ['zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw', 26],
    ])('%s should result in %i', (test: string, result: number) => {
      expect(new Day().challengeTwoHandler(test)).toBe(result);
    });
  });
});
