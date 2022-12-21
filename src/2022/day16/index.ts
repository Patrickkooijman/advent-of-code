import Day from '../../shared/Day';

export default class Day15 extends Day {
    day: number = 15;
    year: number = 2022;
    constructor(private yLine: number, private maxDistress: number | undefined) {
        super();
    }
    challengeOneHandler = (input: string): number => {
        const data: Data = this.parseInput(input);
        let counter: number = 0;

        for (let i: number = data.minX; i <= data.maxX; i++) {
            if (this.doesIntersect(i, this.yLine, data.signals)){
                counter++;
            }
        }

        return counter;
    }
    challengeTwoHandler = (input: string): number => {
        const data: Data = this.parseInput(input);
        const frequencyMultiplyer: number = 4_000_000;

        for (let x: number = 0; x <= this.maxDistress!; x++) {
            for (let y: number = 0; y <= this.maxDistress!; y++) {
                if (this.isUnknownSector(x, y, data.signals)) {
                    return x * frequencyMultiplyer + y;
                }
            }
        }

        return 0;
    };

    private isUnknownSector = (atXPos: number, atYPos: number, signals: Signal[]): boolean => {
        const isBeacon = signals.some((signal: Signal): boolean => signal.beaconY === atYPos && signal.beaconX === atXPos);
        const isSensor = signals.some((signal: Signal): boolean => signal.sensorY === atYPos && signal.sensorX === atXPos);
        const hitsPoint = signals.some((signal: Signal): boolean => {
            return Math.abs(signal.sensorX - atXPos) + Math.abs(signal.sensorY - atYPos) <= signal.distance;
        });

        return !isBeacon && !isSensor && !hitsPoint;
    }

    private doesIntersect = (atXPos: number, atYPos: number, signals: Signal[]): boolean => {
        const isBeacon = signals.some((signal: Signal): boolean => signal.beaconY === atYPos && signal.beaconX === atXPos);
        const hitsPoint = signals.some((signal: Signal): boolean => {
            return Math.abs(signal.sensorX - atXPos) + Math.abs(signal.sensorY - atYPos) <= signal.distance;
        });

        return !isBeacon && hitsPoint
    }

    private parseInput = (input: string): Data => {
        let minX: number = Number.MAX_VALUE;
        let maxX: number = Number.MIN_VALUE
        let minY: number = Number.MAX_VALUE;
        let maxY: number = Number.MIN_VALUE;

        const signals: Array<Signal> = input
          .split('\n')
          .map(line => line.match(/^.+x=(-*\d+),\sy=(-*\d+):.+x=(-*\d+),\sy=(-*\d+)/)
              ?.slice(1, 5)?.map(Number))
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
                  beaconY
              }
          });

        return {
            signals,
            minX,
            maxX,
            minY,
            maxY
        };
    };
}

// interface Point2D {
//     x: number;
//     y: number;
// }
interface Signal {
    sensorX: number,
    sensorY: number,
    beaconX: number,
    beaconY: number;
    distance: number;
}

interface Data {
    signals: Array<Signal>,
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
}
