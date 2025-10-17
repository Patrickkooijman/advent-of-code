import { getExample, getInput } from '../utils';
import { part_1, part_2 } from './index';

describe('Day 3', () => {
  let exampleData: string;
  let inputData: string;

  beforeAll(() => {
    exampleData = getExample(__dirname);
    inputData = getInput(__dirname);
  });

  it('part 1 example', () => {
    expect(part_1(exampleData)).toBe(161);
  });

  it('part 1 input', () => {
    expect(part_1(inputData)).toBe(153469856);
  });

  it('part 2 example', () => {
    expect(
      part_2("xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))")
    ).toBe(48);
  });

  it('part 2 input', () => {
    expect(part_2(inputData)).toBe(77055967);
  });
});
