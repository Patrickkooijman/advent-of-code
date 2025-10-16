import Day from '../../shared/Day';

export class Day1 extends Day {
  day: number = 1;
  year = 2022;

  challengeOneHandler = (input: string): number => Math.max(...this.toValues(input));

  challengeTwoHandler = (input: string): number => {
    const values: Array<number> = this.toValues(input);

    return values
      .sort((a, b) => b - a)
      .slice(0, 3)
      .reduce((a, b) => a + b, 0);
  };

  toValues(input: string): Array<number> {
    let currIndex: number = 0;

    return input.split('\n').reduce((acc: Array<number>, cur: string) => {
      if (cur === '') {
        currIndex++;
      } else {
        acc[currIndex] = (acc[currIndex] || 0) + parseInt(cur);
      }
      return acc;
    }, []);
  }
}
