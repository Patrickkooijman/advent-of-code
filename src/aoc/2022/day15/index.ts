import Day from '../../../shared/Day.ts';

export default class Day15 extends Day {
  day = 15;
  year = 2022;
  constructor(
    private yLine: number,
    private maxDistress: number | undefined
  ) {
    super();
  }

  challengeOneHandler = (input: string): number => {
    const data: Data = this.parseInput(input);
    let counter = 0;

    for (let i: number = data.minX; i <= data.maxX; i++) {
      if (this.doesIntersect(i, this.yLine, data.signals)) {
        counter++;
      }
    }

    return counter;
  };
  challengeTwoHandler = (input: string): number => {
    const data: Data = this.parseInput(input);
    const frequencyMultiplier = 4_000_000;

    for (const signal of data.signals) {
      const { distance, sensorX, sensorY } = signal;
      const border = distance + 1;
      for (let i = 0; i <= border; i++) {
        const coords = [
          { x: sensorX - i, y: sensorY + border - i },
          { x: sensorX + i, y: sensorY + border - i },
          { x: sensorX + i, y: sensorY - border + i },
          { x: sensorX - i, y: sensorY - border + i },
        ];

        for (const coord of coords) {
          const { x, y } = coord;
          if (!(x < 0 || x > this.maxDistress! || y < 0 || y > this.maxDistress!)) {
            if (this.isUnknownSector(x, y, data.signals)) {
              return x * frequencyMultiplier + y;
            }
          }
        }
      }
    }

    return 0;
  };

  private isUnknownSector = (atXPos: number, atYPos: number, signals: Signal[]): boolean => {
    const isBeacon = signals.some(
      (signal: Signal): boolean => signal.beaconY === atYPos && signal.beaconX === atXPos
    );
    const isSensor = signals.some(
      (signal: Signal): boolean => signal.sensorY === atYPos && signal.sensorX === atXPos
    );
    const hitsPoint = signals.some((signal: Signal): boolean => {
      return (
        Math.abs(signal.sensorX - atXPos) + Math.abs(signal.sensorY - atYPos) <= signal.distance
      );
    });

    return !isBeacon && !isSensor && !hitsPoint;
  };

  private doesIntersect = (atXPos: number, atYPos: number, signals: Signal[]): boolean => {
    const isBeacon = signals.some(
      (signal: Signal): boolean => signal.beaconY === atYPos && signal.beaconX === atXPos
    );
    const hitsPoint = signals.some((signal: Signal): boolean => {
      return (
        Math.abs(signal.sensorX - atXPos) + Math.abs(signal.sensorY - atYPos) <= signal.distance
      );
    });

    return !isBeacon && hitsPoint;
  };

  private parseInput = (input: string): Data => {
    let minX: number = Number.MAX_VALUE;
    let maxX: number = Number.MIN_VALUE;
    let minY: number = Number.MAX_VALUE;
    let maxY: number = Number.MIN_VALUE;

    const signals: Signal[] = input
      .split('\n')
      .map(line =>
        /^.+x=(-*\d+),\sy=(-*\d+):.+x=(-*\d+),\sy=(-*\d+)/.exec(line)?.slice(1, 5)?.map(Number)
      )
      .map(([sensorX = 0, sensorY = 0, beaconX = 0, beaconY = 0]: number[] = []): Signal => {
        const distance = Math.abs(sensorX - beaconX) + Math.abs(sensorY - beaconY);
        minX = Math.min(minX - distance, sensorX, beaconX);
        maxX = Math.max(maxX + distance, sensorX, beaconX);
        minY = Math.min(minY, sensorY, beaconY);
        maxY = Math.max(maxY, sensorY, beaconY);

        return {
          distance,
          sensorX,
          sensorY,
          beaconX,
          beaconY,
        };
      });

    return {
      signals,
      minX,
      maxX,
      minY,
      maxY,
    };
  };
}
interface Signal {
  sensorX: number;
  sensorY: number;
  beaconX: number;
  beaconY: number;
  distance: number;
}

interface Data {
  signals: Signal[];
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}
