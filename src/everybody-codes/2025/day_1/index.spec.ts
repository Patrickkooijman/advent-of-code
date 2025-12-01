import { getExample, getInput } from '../../../shared/utils';
import { part_1, part_2, part_3 } from './index.ts';

describe('Day 1', () => {
  it('part 1 example', () => {
    expect(part_1(getExample(__dirname, 'example-1.txt'))).toBe('Fyrryn');
  });

  it('part 1 input', () => {
    expect(part_1(getInput(__dirname, 'input-1.txt'))).toBe('Xaneldrin');
  });

  it('part 2 example', () => {
    expect(part_2(getExample(__dirname, 'example-1.txt'))).toBe('Elarzris');
  });

  it('part 2 input', () => {
    expect(part_2(getInput(__dirname, 'input-2.txt'))).toBe('Ulmarulth');
  });

  it('part 3 example', () => {
    expect(part_3(getExample(__dirname, 'example-3.txt'))).toBe('Drakzyph');
  });

  it('part 3 input', () => {
    expect(part_3(getInput(__dirname, 'input-3.txt'))).toBe('Myrjorath');
  });
});
