import Item from './item.ts';
import { Direction, IGrid, State, Value } from './types.ts';

export default class Grid implements IGrid {
  items: Map<string, Item>;
  state: State = State.MOVING;
  cursor = '';
  currentDirection: Direction = Direction.UP;
  currentItem: Item | null = null;
  visitedCount = 1;
  initItem: Item | null = null;
  initCursor: string | null = null;

  constructor(data: string) {
    this.items = new Map<string, Item>();

    const lines = data.split('\n').filter(Boolean);
    for (let y = 0; y < lines.length; y++) {
      const line = lines[y];
      for (let x = 0; x < line!.length; x++) {
        const char = line![x];
        const item: Item = new Item(x, y, `${char}`);

        if (item.value === Value.CURSOR) {
          this.cursor = `${x}-${y}`;
          this.currentItem = item;
          this.initItem = item;
          this.initCursor = `${x}-${y}`;
        }

        this.items.set(`${x}-${y}`, item);
      }
    }

    this.state = State.MOVING;
    this.currentDirection = Direction.UP;
  }

  reset(): void {
    this.cursor = this.initCursor!;
    this.currentItem = this.initItem;
    this.state = State.MOVING;
    this.currentDirection = Direction.UP;

    for (const item of this.items.values()) {
      item.visited = false;
    }
  }

  move(direction: Direction, item: Item): Item | undefined {
    switch (direction) {
      case Direction.UP:
        return this.items.get(`${item.x}-${item.y - 1}`)!;
      case Direction.DOWN:
        return this.items.get(`${item.x}-${item.y + 1}`)!;
      case Direction.LEFT:
        return this.items.get(`${item.x - 1}-${item.y}`)!;
      case Direction.RIGHT:
        return this.items.get(`${item.x + 1}-${item.y}`)!;
    }
  }

  turnRight() {
    switch (this.currentDirection) {
      case Direction.UP:
        this.currentDirection = Direction.RIGHT;
        break;
      case Direction.RIGHT:
        this.currentDirection = Direction.DOWN;
        break;
      case Direction.DOWN:
        this.currentDirection = Direction.LEFT;
        break;
      case Direction.LEFT:
        this.currentDirection = Direction.UP;
        break;
    }
  }

  execute(withCircular = false): State {
    while (this.state === State.MOVING) {
      const currentItem = this.items.get(this.cursor)!;
      const newItem = this.move(this.currentDirection, currentItem);

      if (newItem === undefined) {
        this.state = State.LEAVING;
        continue;
      }

      if (newItem.value === Value.BLOCKED) {
        this.turnRight();
        continue;
      }

      if (withCircular && newItem.visited && newItem.inDirection === this.currentDirection) {
        this.state = State.CIRCULAR;
        continue;
      }

      if (!newItem.visited) {
        newItem.visited = true;
        newItem.inDirection = this.currentDirection;
        this.visitedCount++;
      }

      this.cursor = newItem.getKey();
    }

    return this.state;
  }
}
