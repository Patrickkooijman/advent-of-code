import { Method, State } from './types.ts';

export const methods: Method[] = [
  (a: number, b: number): number => a + b,
  (a: number, b: number): number => a * b,
];

export class Node {
  value = 0;
  parent: Node | null = null;
  child: Node | null = null;
  expected = 0;

  execute = (values: number[]): State => {
    if (!this.parent) {
      // Root node
      return this.child!.execute([this.value]);
    }

    if (!this.child) {
      // Leaf node
      return methods.some(method =>
        values.some(value => method(value, this.value) === this.expected)
      )
        ? State.MATCH
        : State.INVALID;
    }

    const options: number[] = methods
      .flatMap(method => values.map(value => method(value, this.value)))
      .filter(value => value <= this.expected);

    return this.child.execute(options);
  };

  constructor(sum: number, numbers: number[], parent?: Node) {
    if (parent) {
      this.parent = parent;
    }

    this.expected = sum;
    this.value = numbers.shift()!;

    if (numbers.length) {
      this.child = new Node(sum, numbers, this);
    }
  }
}
