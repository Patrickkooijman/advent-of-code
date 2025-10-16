import Day from '../../shared/Day';

export default class Day14 extends Day {
  day: number = 14;
  year: number = 2022;
  challengeOneHandler = (input: string): number => this.countDroppedSands(this.parseInput(input));
  challengeTwoHandler = (input: string): number =>
    this.countDroppedSandsPartTwo(this.parseInput(input));

  private countDroppedSands = (data: Data): number => {
    let amount: number = 0;
    while (this.dropSand(data)) {
      amount++;
    }

    return amount;
  };

  private dropSand = (data: Data): boolean => {
    const { points, lowest } = data;
    const entryPoint: string = '500,0';

    let currentX: number = 500;
    let currentY: number = 0;

    if (!points.has(entryPoint)) {
      points.set(entryPoint, {
        x: currentX,
        y: currentY + 1,
        value: Content.SAND,
      });
    }

    while (true) {
      let beforeX: number = currentX - 1;
      let nextX: number = currentX + 1;
      let belowY: number = currentY + 1;

      let current: string = `${currentX},${currentY}`;
      let before: string = `${beforeX},${belowY}`;
      let next: string = `${nextX},${belowY}`;
      let below: string = `${currentX},${belowY}`;

      // Below lowest
      if (belowY > lowest) return false;

      // Below one is empty
      if (!points.has(below)) {
        points.get(current)!.value = Content.AIR;
        points.set(below, {
          x: currentX,
          y: currentY + 1,
          value: Content.SAND,
        });
        currentY = belowY;
      }

      // Below is air
      else if (points.get(below)!.value === Content.AIR) {
        points.get(current)!.value = Content.AIR;
        points.get(below)!.value = Content.SAND;
        currentY = belowY;
      }

      // left
      else if (!points.has(before) || points.get(before)!.value === Content.AIR) {
        points.get(current)!.value = Content.AIR;
        points.set(before, {
          x: beforeX,
          y: belowY,
          value: Content.SAND,
        });
        currentY = belowY;
        currentX = beforeX;
      }

      // right
      else if (!points.has(next) || points.get(next)!.value === Content.AIR) {
        points.get(current)!.value = Content.AIR;
        points.set(next, {
          x: nextX,
          y: belowY,
          value: Content.SAND,
        });
        currentY = belowY;
        currentX = nextX;
      } else {
        return true;
      }
    }
  };

  private countDroppedSandsPartTwo = (data: Data): number => {
    let amount: number = 0;
    while (this.dropSandPartTwo(data)) {
      amount++;
    }

    return amount + 1;
  };
  private dropSandPartTwo = (data: Data): boolean => {
    const { points, lowest } = data;
    const entryPoint: string = '500,0';

    let currentX: number = 500;
    let currentY: number = 0;

    if (!points.has(entryPoint)) {
      points.set(entryPoint, {
        x: currentX,
        y: currentY + 1,
        value: Content.SAND,
      });
    }

    while (true) {
      let beforeX: number = currentX - 1;
      let nextX: number = currentX + 1;
      let belowY: number = currentY + 1;

      let current: string = `${currentX},${currentY}`;
      let before: string = `${beforeX},${belowY}`;
      let next: string = `${nextX},${belowY}`;
      let below: string = `${currentX},${belowY}`;

      // Below one is empty
      if (!points.has(below)) {
        points.get(current)!.value = Content.AIR;
        points.set(below, {
          x: currentX,
          y: currentY + 1,
          value: Content.SAND,
        });
        currentY = belowY;
      }

      // Below is air
      else if (points.get(below)!.value === Content.AIR) {
        points.get(current)!.value = Content.AIR;
        points.get(below)!.value = Content.SAND;
        currentY = belowY;
      }

      // left
      else if (!points.has(before) || points.get(before)!.value === Content.AIR) {
        points.get(current)!.value = Content.AIR;
        points.set(before, {
          x: beforeX,
          y: belowY,
          value: Content.SAND,
        });
        currentY = belowY;
        currentX = beforeX;
      }

      // right
      else if (!points.has(next) || points.get(next)!.value === Content.AIR) {
        points.get(current)!.value = Content.AIR;
        points.set(next, {
          x: nextX,
          y: belowY,
          value: Content.SAND,
        });
        currentY = belowY;
        currentX = nextX;
      } else if (currentX === 500 && currentY === 0) {
        return false;
      } else {
        return true;
      }
      if (currentY === lowest + 1) {
        return true;
      }
    }
  };

  private parseInput = (input: string): Data => {
    const points: Map<string, Point> = new Map();
    let lowest: number = 0;

    const lines: string[] = input.split('\n').filter(Boolean);
    lines.forEach((line: string) =>
      line.split('->').forEach((from: string, index: number, self: string[]): void => {
        const to: string | undefined = self[index + 1];
        if (!!to) {
          const [xFrom, yFrom] = from.split(',').map(Number);
          const [xTo, yTo] = to.split(',').map(Number);

          const xLine = [xFrom, xTo].sort((a, b) => a! - b!);
          const yLine = [yFrom, yTo].sort((a, b) => a! - b!);

          for (let x: number = xLine[0]!; x <= xLine[1]!; x++) {
            for (let y: number = yLine[0]!; y <= yLine[1]!; y++) {
              points.set(`${x},${y}`, { x, y, value: Content.ROCK });
              lowest = Math.max(y, lowest);
            }
          }
        }
      })
    );

    return {
      points,
      lowest,
    };
  };
}

enum Content {
  ROCK,
  SAND,
  AIR,
}

interface Data {
  points: Map<string, Point>;
  lowest: number;
}

interface Point {
  x: number;
  y: number;
  value: Content;
}
