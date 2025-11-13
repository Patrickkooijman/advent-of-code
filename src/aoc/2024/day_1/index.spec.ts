import { getExample, getInput } from '../../../shared/utils';
import { part_1, part_2 } from './index.ts';

describe('day 1', () => {
  it('part 1 example', () => {
    const data = getExample(__dirname);

    expect(part_1(data)).toBe(11);
  });

  it('part 1 input', () => {
    const data = getInput(__dirname);

    expect(part_1(data)).toBe(3569916);
  });

  it('part 2 example', () => {
    const data = getExample(__dirname);

    expect(part_2(data)).toBe(31);
  });

  it('part 2 input', () => {
    const data = getInput(__dirname);

    expect(part_2(data)).toBe(26407426);
  });
});
