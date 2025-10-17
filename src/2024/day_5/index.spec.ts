import { getExample, getInput } from '../utils';
import { part_1, part_2 } from './index';

describe('Day', () => {
  let exampleData: string;
  let inputData: string;

  beforeAll(() => {
    exampleData = getExample(__dirname);
    inputData = getInput(__dirname);
  });

  it('part 1 example', () => {
    expect(part_1(exampleData)).toBe(143);
  });

  it('part 1 input', () => {
    expect(part_1(inputData)).toBe(7024);
  });

  it('part 2 example', () => {
    expect(part_2(exampleData)).toBe(123);
  });

  it('part 2 input', () => {
    expect(part_2(inputData)).toBe(4151);
  });
});
