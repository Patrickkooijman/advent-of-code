import Grid from './grid.ts';
import { State, Value } from './types.ts';

export const part_1 = (data: string): number => {
  const grid = new Grid(data);
  grid.execute();

  return grid.visitedCount;
};

export const part_2 = (data: string): number => {
  const grid = new Grid(data);
  let amountOfValidBlocks = 0;
  let oldItemValue: Value;

  for (const item of grid.items.values()) {
    oldItemValue = item.value;
    item.value = Value.BLOCKED;

    if (grid.execute(true) === State.CIRCULAR) {
      amountOfValidBlocks++;
    }

    item.value = oldItemValue;
    grid.reset();
  }

  return amountOfValidBlocks;
};
