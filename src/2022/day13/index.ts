import Day from '../../shared/Day';

export default class Day13 extends Day {
  day = 13;
  year = 2022;
  challengeOneHandler = (input: string): number => {
    const pairs: Pair[] = this.parseInput(input);
    const results = pairs.map(({ left, right }) => this.isInCorrectOrder(left, right));

    return results.reduce(
      (acc: number, curr: boolean | undefined, index: number) => acc + (curr ? index + 1 : 0),
      0
    );
  };
  challengeTwoHandler = (input: string): number => {
    const firstAdditionalPackage: number[][] = [[2]];
    const secondAdditionalPackage: number[][] = [[6]];

    const pairs: Pair[] = this.parseInput(input);
    const packets: number[][][] = [firstAdditionalPackage, secondAdditionalPackage].concat(
      pairs.flatMap(({ left, right }) => [left, right])
    );

    this.sortPackets(packets);

    const firstAdditionalPackageIndex: number =
      packets.findIndex(packet => packet === firstAdditionalPackage) + 1;
    const secondAdditionalPackageIndex: number =
      packets.findIndex(packet => packet === secondAdditionalPackage) + 1;

    return firstAdditionalPackageIndex * secondAdditionalPackageIndex;
  };

  private sortPackets = (packets: number[][][]): number[][][] =>
    packets.sort((packetA, packetB) => (this.isInCorrectOrder(packetA, packetB) ? -1 : 1));

  private isInCorrectOrder(
    left: number | number[] | number[][],
    right: number | number[] | number[][]
  ): boolean | undefined {
    if (left === undefined) return true;
    if (right === undefined) return false;

    const leftIsNumber = typeof left === 'number';
    const rightIsNumber = typeof right === 'number';

    if (leftIsNumber && rightIsNumber) {
      return left === right ? undefined : left < right;
    }

    if (!leftIsNumber && !rightIsNumber) {
      for (let index = 0; index < Math.max(left.length, right.length); index++) {
        const isInRightOrder = this.isInCorrectOrder(left[index]!, right[index]!);
        if (typeof isInRightOrder === 'boolean') return isInRightOrder;
      }
    }

    if (leftIsNumber && !rightIsNumber) return this.isInCorrectOrder([left], right);
    if (!leftIsNumber && rightIsNumber) return this.isInCorrectOrder(left, [right]);
    return;
  }
  private parseInput = (input: string): Pair[] =>
    input.split(/\n\s*\n/).map((line: string): Pair => {
      const [left, right] = line.split('\n');
      return {
        left: JSON.parse(left!),
        right: JSON.parse(right!),
      };
    });
}

interface Pair {
  left: number[];
  right: number[];
}
