import { IItem } from './types.ts';

export default class Item implements IItem {
  readonly x: number;
  readonly y: number;
  value: string;
  antinode = false;

  constructor(x: number, y: number, value: string) {
    this.x = x;
    this.y = y;
    this.value = value;
  }

  getKey() {
    return `${this.x}-${this.y}`;
  }
}
