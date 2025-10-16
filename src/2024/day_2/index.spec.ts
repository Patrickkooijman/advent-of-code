import { getExample, getInput } from '../utils';
import { part_1, part_2 } from './index';

describe('Day 2', () => {
  let exampleData: string;
  let inputData: string;

  beforeAll(() => {
    exampleData = getExample(__dirname);
    inputData = getInput(__dirname);
  });

  it('part 1 example', () => {
    expect(part_1(exampleData)).toEqual(2);
  });

  it('part 1 input', () => {
    expect(part_1(inputData)).toEqual(390);
  });

  it('part 2 example', () => {
    expect(part_2(exampleData)).toEqual(4);
  });

  it('part 2 input', () => {
    expect(part_2(inputData)).toEqual(439);
  });
});
