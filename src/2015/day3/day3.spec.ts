import { challengeOneHandler, challengeTwoHandler } from './index';

describe('day 3', () => {
  describe('challenge one', () => {
    // > delivers presents to 2 houses: one at the starting location, and one to the east.
    //     ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
    //     ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.

    test.each([
      ['>', 2],
      ['^>v<', 4],
      ['^v^v^v^v^v', 2],
    ])('%s should result in %i', (test: string, result: number) => {
      expect(challengeOneHandler(test)).toBe(result);
    });
  });

  describe('challenge two', () => {
    // ^v delivers presents to 3 houses, because Santa goes north, and then Robo-Santa goes south.
    // ^>v< now delivers presents to 3 houses, and Santa and Robo-Santa end up back where they started.
    // ^v^v^v^v^v now delivers presents to 11 houses, with Santa going one direction and Robo-Santa going the other.

    test.each([
      ['^v', 3],
      ['^>v<', 3],
      ['^v^v^v^v^v', 11],
    ])('%s should result in %i', (test: string, result: number) => {
      expect(challengeTwoHandler(test)).toBe(result);
    });
  });
});
