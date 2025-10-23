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
    expect(part_1(exampleData)).toBe(3749);
  });

  it('part 1 input', () => {
    expect(part_1(inputData)).toBe(945512582195);
  });

  it.each([
    ['4: 1 1 1 1', 4],
    ['2: 1 1', 2],
    ['5: 2 3', 5],
  ])('should calculate correctly', (data, result) => {
    expect(part_1(data)).toBe(result);
  });

  it('part 2 example', () => {
    expect(part_2(exampleData)).toBe(11387);
  });

  it('part 2 input', () => {
    expect(part_2(inputData)).toBe(271691107779347);
  });
});
