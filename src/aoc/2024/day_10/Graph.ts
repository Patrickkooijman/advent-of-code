interface Item {
  value: number;
}

export default class Graph {
  graphItems: Record<string, string[]>;
  items: Map<string, Item>;

  constructor(data: string) {
    this.graphItems = {};
    this.items = new Map<string, Item>();

    const lines = data.trim().split('\n');
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line!.length; x++) {
        const char = line![x]!;
        const key = `${x}-${y}`;
        this.graphItems[key] = [];
        this.items.set(key, { value: Number(char) });

        const directions: number[][] = [
          [0, -1], // up
          [0, 1], // down
          [-1, 0], // left
          [1, 0], // right
        ];
        for (const [dx, dy] of directions) {
          const newX = x + dx!;
          const newY = y + dy!;
          if (newX >= 0 && newX < line!.length && newY >= 0 && newY < lines.length) {
            const neighborKey = `${newX}-${newY}`;
            this.graphItems[key].push(neighborKey);
          }
        }
      }
    }
  }

  executeBFS(startKey: string): number {
    let count = 0;
    const queue: string[] = [startKey];
    const visited = new Set<string>();

    while (queue.length > 0) {
      const currentKey = queue.shift()!;
      const currentItem = this.items.get(currentKey)!;
      visited.add(currentKey);

      if (currentItem.value === 9) {
        count++;
        continue;
      }

      const neighbors = this.graphItems[currentKey]!;

      for (const neighborKey of neighbors) {
        const neighborItem = this.items.get(neighborKey)!;
        if (
          !visited.has(neighborKey) &&
          !queue.includes(neighborKey) &&
          neighborItem.value === currentItem.value + 1
        ) {
          queue.push(neighborKey);
        }
      }
    }

    return count;
  }

  executeDFS(startKey: string): number {
    let count = 0;
    const stack: string[] = [startKey];
    const visited = new Set<string>();

    while (stack.length > 0) {
      const currentKey = stack.pop()!;
      const currentItem = this.items.get(currentKey)!;
      visited.add(currentKey);
        if (currentItem.value === 9) {
        count++;
        }
        const neighbors = this.graphItems[currentKey]!;
        for (const neighborKey of neighbors) {
            const neighborItem = this.items.get(neighborKey)!;
            if (
                !visited.has(neighborKey) &&
                !stack.includes(neighborKey) &&
                neighborItem.value === currentItem.value + 1
            ) {
                stack.push(neighborKey);
            }
        }

}
