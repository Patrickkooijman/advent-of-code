import { getExample, getInput } from '../../../shared/utils';
import { part_1, part_2, part_3 } from './index.ts';

describe('Day 5', () => {
  it('part 1 example', () => {
    expect(part_1([5, 3, 7, 8, 9, 10, 4, 5, 7, 8, 8])).toBe(581078);
  });

  it('part 1 input', () => {
    expect(
      part_1([
        7, 1, 8, 6, 3, 8, 8, 1, 5, 8, 9, 2, 4, 6, 2, 3, 9, 8, 5, 9, 3, 6, 8, 3, 1, 7, 9, 3, 1, 9,
      ])
    ).toBe(7685438387);
  });

  it('part 2 example', () => {
    expect(part_2(getExample(__dirname, 'example-2.txt'))).toBe(77053);
  });

  it('part 2 input', () => {
    expect(part_2(getInput(__dirname, 'input-2.txt'))).toBe(8994512994861);
  });

  it('part 3 example', () => {
    expect(part_3(getExample(__dirname, 'example-3.txt'))).toBe(260);
  });

  it('part 3 input', () => {
    expect(part_3(getInput(__dirname, 'input-3.txt'))).toBe(31769825);
  });
});
