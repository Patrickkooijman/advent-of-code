import Item from './item.ts';

export interface IGrid {
  items: Map<string, Item>;
}

export interface IItem {
  x: number;
  y: number;
  value: string;
  antinode: boolean;
  getKey: () => string;
}
