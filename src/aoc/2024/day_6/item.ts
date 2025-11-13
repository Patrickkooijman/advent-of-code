import { Direction, IItem, Value } from './types.ts';

export default class Item implements IItem {
  readonly x: number;
  readonly y: number;
  value: Value;
  visited: boolean;
  inDirection?: Direction;

  constructor(x: number, y: number, value: string) {
    this.x = x;
    this.y = y;
    if (value === '^') {
      this.value = Value.CURSOR;
    } else {
      this.value = value === '#' ? Value.BLOCKED : Value.EMPTY;
    }
    this.visited = value === '^';
  }

  getKey(): string {
    return `${this.x}-${this.y}`;
  }
}
