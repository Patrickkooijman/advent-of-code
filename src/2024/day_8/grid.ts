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

  setAntinodes(): number {
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

          const nodeX = item.x + item.x - otherItem.x;
          const nodeY = item.y + item.y - otherItem.y;
          const nodeKey = `${nodeX}-${nodeY}`;

          if (this.items.has(nodeKey)) {
            const nodeItem = this.items.get(nodeKey)!;
            if (!nodeItem.antinode) {
              nodeItem.antinode = true;
              antinodesCount++;
            }
          }
        }
      }
    }

    return antinodesCount;
  }
}
