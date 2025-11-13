export interface IItem {
  x: number;
  y: number;
  value: string;
  antinode: boolean;
  getKey: () => string;
}
