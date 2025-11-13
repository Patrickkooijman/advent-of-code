import Day from '../../../shared/Day.ts';

export class Day6 extends Day {
  day = 6;
  year = 2022;

  challengeOneHandler = (input: string): number => this.findIndexOf(input, 4);
  challengeTwoHandler = (input: string): number => this.findIndexOf(input, 14);

  private findIndexOf = (input: string, amountOfLetters: number): number => {
    for (let i = 0; i < input.length + amountOfLetters; i++) {
      if (new Set(input.slice(i, i + amountOfLetters)).size === amountOfLetters) {
        return i + amountOfLetters;
      }
    }
    return -1;
  };
}
export default Day6;
