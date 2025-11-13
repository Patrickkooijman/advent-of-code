import Item from './item.ts';
import { IGrid } from './types.ts';

export default class Grid implements IGrid {
  items: Map<string, Item>;
  valuesMap: Map<string, Item[]>;
  rows: number;
  cols: number;

  constructor(data: string) {
    this.items = new Map<string, Item>();
    this.valuesMap = new Map<string, Item[]>();

    const lines = data.split('\n').filter(Boolean);
    this.rows = lines.length;
    this.cols = lines[0]!.length;

    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line!.length; x++) {
        const char = line![x]!;
        const item: Item = new Item(x, y, char);

        this.items.set(`${x}-${y}`, item);
        if (!this.valuesMap.has(char)) {
          this.valuesMap.set(char, []);
        }
        this.valuesMap.get(char)!.push(item);
      }
    }
  }

  getSingleNodeKey = (item: Item, otherItem: Item): string[] => {
    const nodeX = item.x + item.x - otherItem.x;
    const nodeY = item.y + item.y - otherItem.y;

    return [`${nodeX}-${nodeY}`];
  };

  getAllNodeKeys = (item: Item, otherItem: Item): string[] => {
    const nodeKeys: string[] = [];

    const xDistance = item.x - otherItem.x;
    const yDistance = item.y - otherItem.y;

    const [xDist, yDist] = reduce(xDistance, yDistance);

    const forStep = (step = 1): void => {
      const nodeX = item.x - xDist * step;
      const nodeY = item.y - yDist * step;
      const nodeKey = `${nodeX}-${nodeY}`;

      if (this.items.has(nodeKey)) {
        nodeKeys.push(nodeKey);
        forStep(step + 1);
      }
    };

    forStep();

    return nodeKeys;
  };

  setAntinodes(all = false): number {
    let antinodesCount = 0;

    for (const [value, items] of this.valuesMap.entries()) {
      if (value === '.') {
        continue;
      }

      for (const item of items) {
        for (const otherItem of items) {
          if (item === otherItem) {
            continue;
          }

          const nodeKeys = all
            ? this.getAllNodeKeys(item, otherItem)
            : this.getSingleNodeKey(item, otherItem);

          for (const key of nodeKeys) {
            const item = this.items.get(key);
            if (item && !item.antinode) {
              item.antinode = true;
              antinodesCount++;
            }
          }
        }
      }
    }

    return antinodesCount;
  }
}

const getGCD = function (a: number, b: number): number {
  if (!b) {
    return a;
  }
  return getGCD(b, a % b);
};

const reduce = function (n: number, d: number): [number, number] {
  const gcd = getGCD(Math.abs(n), Math.abs(d));

  return [n / gcd, d / gcd];
};
