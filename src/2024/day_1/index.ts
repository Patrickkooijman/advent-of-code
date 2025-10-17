import { getInput } from '../utils';

const parseInput = (data: string): number[][] => {
  const col1: number[] = [];
  const col2: number[] = [];

  const numbers: number[][] = data
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(/\s+/g).map(Number));

  for (const [num1, num2] of numbers) {
    col1.push(num1!);
    col2.push(num2!);
  }

  return [col1, col2];
};

export const part_1 = (data: string) => {
  const [col1, col2] = parseInput(data);

  col1!.sort((a, b) => a - b);
  col2!.sort((a, b) => a - b);

  let sum = 0;
  for (let i = 0; i < col1!.length; i++) {
    sum += Math.abs(col1![i]! - col2![i]!);
  }

  console.log(sum);

  return sum;
};

export const part_2 = (data: string) => {
  const [col1, col2] = parseInput(data);

  let total = 0;

  for (const num of col1!) {
    const count = col2!.filter(n => n === num).length;
    total += num * count;
  }
  console.log(total);

  return total;
};

export function main() {
  const data = getInput(__dirname);
  part_1(data);
  part_2(data);
}

if (require.main === module) {
  main();
}
