import Grid from './grid.ts';

export const part_1 = (data: string): number => {
  const grid = new Grid(data);

  return grid.setAntinodes();
};

export const part_2 = (data: string): number => {
  const grid = new Grid(data);

  return grid.setAntinodes(true);
};
