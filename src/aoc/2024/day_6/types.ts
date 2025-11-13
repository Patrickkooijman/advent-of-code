import Item from './item.ts';

export interface IGrid {
  items: Map<string, Item>;
  state: State;
  cursor: string;
  currentDirection: Direction;
  currentItem: Item | null;
  visitedCount: number;
  initItem: Item | null;
  initCursor: string | null;
  reset: () => void;
  move: (direction: Direction, item: Item) => Item | undefined;
  turnRight: () => void;
  execute: (withCircular?: boolean) => State;
}

export interface IItem {
  x: number;
  y: number;
  value: Value;
  visited: boolean;
  inDirection?: Direction;
  getKey: () => string;
}

export enum Direction {
  UP,
  DOWN,
  LEFT,
  RIGHT,
}

export enum Value {
  EMPTY,
  BLOCKED,
  CURSOR,
}

export enum State {
  MOVING,
  LEAVING,
  CIRCULAR,
}
