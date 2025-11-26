import { add, divide, multiply, part_1, part_2, part_3 } from './index.ts';

describe('Day 2', () => {
  it.each([
    [
      [1, 1],
      [2, 2],
      [3, 3],
    ],
    [
      [2, 5],
      [3, 7],
      [5, 12],
    ],
    [
      [-2, 5],
      [10, -1],
      [8, 4],
    ],
    [
      [-1, -2],
      [-3, -4],
      [-4, -6],
    ],
  ])('add %p and %p to equal %p', (a, b, expected) => {
    expect(add(a, b)).toStrictEqual(expected);
  });

  it.each([
    [
      [1, 1],
      [2, 2],
      [0, 4],
    ],
    [
      [2, 5],
      [3, 7],
      [-29, 29],
    ],
    [
      [-2, 5],
      [10, -1],
      [-15, 52],
    ],
    [
      [-1, -2],
      [-3, -4],
      [-5, 10],
    ],
  ])('multiply %p and %p to equal %p', (a, b, expected) => {
    expect(multiply(a, b)).toStrictEqual(expected);
  });

  it.each([
    [
      [10, 12],
      [2, 2],
      [5, 6],
    ],
    [
      [11, 12],
      [3, 5],
      [3, 2],
    ],
    [
      [-10, -12],
      [2, 2],
      [-5, -6],
    ],
    [
      [-11, -12],
      [3, 5],
      [-3, -2],
    ],
  ])('divide %p by %p to equal %p', (a, b, expected) => {
    expect(divide(a, b)).toStrictEqual(expected);
  });

  it('part 1 example', () => {
    expect(part_1([25, 9])).toBe('[357,862]');
  });

  it('part 1 input', () => {
    expect(part_1([143, 53])).toBe('[117945,598088]');
  });

  it('part 2 example', async () => {
    await expect(part_2([35300, -64910])).resolves.toBe(4076);
  });

  it('part 2 input', async () => {
    await expect(part_2([-3324, -69783])).resolves.toBe(566);
  });

  it('part 3 example', async () => {
    await expect(part_3([35300, -64910])).resolves.toBe(406954);
  });

  it('part 3 input', async () => {
    await expect(part_3([-3324, -69783])).resolves.toBe(53799);
  });
});
