import Day from '../../shared/Day';

export default class Day9 extends Day {
  day: number = 9;
  year: number = 2022;

  challengeOneHandler = (input: string): number => this.calculateTouchedFields(input, 1);
  challengeTwoHandler = (input: string): number => this.calculateTouchedFields(input, 9);

  parseInput = (input: string): Action[] => {
    return input
      .split('\n')
      .filter(Boolean)
      .map((line: string): Action => {
        const [direction, distance] = line.split(' ');
        return [direction || '', Number(distance)];
      });
  };

  private calculateTouchedFields = (input: string, amountOfKnots: number) => {
    const actions: Array<Action> = this.parseInput(input);
    let knots: Coordinate[] = Array(amountOfKnots + 1)
      .fill(null)
      .map(() => ({ x: 0, y: 0 }));
    let head: Coordinate = knots.at(0)!;
    const tails: Array<Coordinate> = [knots.at(-1)!];

    actions.forEach(([dir, distance]: Action) => {
      for (let i = 1; i <= distance; i++) {
        switch (dir) {
          case 'U':
            head.y++;
            break;
          case 'D':
            head.y--;
            break;
          case 'R':
            head.x++;
            break;
          case 'L':
            head.x--;
            break;
        }

        knots.forEach((knot: Coordinate, index: number) => {
          if (index !== knots.length - 1) {
            const next = knots[index + 1]!;
            if (!this.isTailWithinRange(knot, next)) {
              knots[index + 1] = this.moveTailTo(knot, next);
            }
          } else {
            tails.push(knots.at(-1)!);
          }
        });
      }
    });

    return this.calculateResult(tails);
  };

  private isTailWithinRange = (head: Coordinate, tail: Coordinate): boolean =>
    Math.abs(head.x - tail.x) <= 1 && Math.abs(head.y - tail.y) <= 1;
  private isNextTo = (head: Coordinate, tail: Coordinate): boolean =>
    (head.x === tail.x && Math.abs(head.y - tail.y) <= 1) ||
    (head.y === tail.y && Math.abs(head.x - tail.x) <= 1);
  private moveTailTo = (head: Coordinate, tail: Coordinate): Coordinate => {
    const options: Array<Coordinate> = [
      // NW
      { x: tail.x + 1, y: tail.y - 1 },
      // N
      { x: tail.x, y: tail.y - 1 },
      //NO
      { x: tail.x - 1, y: tail.y - 1 },
      // W
      { x: tail.x - 1, y: tail.y },
      // ZW
      { x: tail.x - 1, y: tail.y + 1 },
      // Z
      { x: tail.x, y: tail.y + 1 },
      // ZW
      { x: tail.x + 1, y: tail.y + 1 },
      // W
      { x: tail.x + 1, y: tail.y },
    ];
    return (
      options.find((option: Coordinate): boolean => !!option && this.isNextTo(head, option)) ||
      options.find(
        (option: Coordinate): boolean => !!option && this.isTailWithinRange(head, option)
      ) || { x: 0, y: 0 }
    );
  };

  private calculateResult = (tails: Array<Coordinate>): number =>
    tails.filter(
      (tail: Coordinate, index: number, self: Coordinate[]): boolean =>
        self.findIndex((coor: Coordinate): boolean => coor.x === tail.x && coor.y === tail.y) ===
        index
    ).length;
}

type Action = [dir: string, distance: number];

interface Coordinate {
  x: number;
  y: number;
}
