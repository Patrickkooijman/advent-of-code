export type Method = (a: number, b: number) => number;

export enum State {
  INVALID,
  MATCH,
}

export interface Equation {
  sum: number;
  numbers: number[];
}

export interface Node {
  value: number;
  parent?: Node;
  child?: Node;
  expected: number;
  execute: (values: number[]) => State;
}
