import Day from '../../shared/Day';

export class Day3 extends Day {
  day: number = 3;
  year = 2022;

  challengeOneHandler(input: string): number {
    return input
      .split('\n')
      .filter(Boolean)
      .map(
        (bag: string): ItemsInBag => [
          bag.split('').splice(bag.length / 2),
          bag.split('').slice(0, bag.length / 2),
        ]
      )
      .map(([bagOne = [], bagTwo = []]: string[][]) => bagOne.find(item => bagTwo.includes(item)))
      .map((item: string = '!'): number => Day3.valueItemInBag(item))
      .reduce((acc: number, curr: number): number => acc + curr, 0);
  }

  challengeTwoHandler(input: string): number {
    const bags: Array<Array<string>> = input
      .split('\n')
      .filter(Boolean)
      .map(i => i.split(''));

    return Day3.spliceIntoChunks(bags, 3)
      .map(
        (group: string[][] = []): string =>
          (group.at(0) || []).find(
            item => (group.at(1) || []).includes(item) && (group.at(2) || []).includes(item)
          ) || '!'
      )
      .map((item: string = '!'): number => Day3.valueItemInBag(item))
      .reduce((acc: number, curr: number): number => acc + curr, 0);
  }

  private static valueItemInBag(item: string): number {
    return '!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.indexOf(item);
  }

  private static spliceIntoChunks(arr: string[][], chunkSize: number): Array<Array<Array<string>>> {
    const res = [];
    while (arr.length > 0) {
      const chunk = arr.splice(0, chunkSize);
      res.push(chunk);
    }
    return res;
  }
}
type ItemsInBag = [bagOne: string[], bagTwo: string[]];
