import { getExample, getInput } from '../../../shared/utils';
import { part_1, part_2 } from './index.ts';

describe('Day', () => {
  let exampleData: string;
  let inputData: string;

  beforeAll(() => {
    exampleData = getExample(__dirname);
    inputData = getInput(__dirname);
  });

  it('part 1 example', () => {
    expect(part_1(exampleData)).toBe(1928);
  });

  it('part 1 input', () => {
    expect(part_1(inputData)).toBe(6446899523367);
  });

  it('part 2 example', () => {
    expect(part_2(exampleData)).toBe(2858);
  });

  it('part 2 input', () => {
    expect(part_2(inputData)).toBe(6478232739671);
  });
});
