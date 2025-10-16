import { getInput } from '../utils';

const parseInput = (data: string): number[][] => {
  return data
    .split('\n')
    .filter(line => line.trim() !== '')
    .map(line => line.split(' ').map(Number));
};

const isValid = (curr: number[], idx: number): boolean => {
  if (idx === curr.length - 1) {
    return true;
  }

  const isIncreasing: boolean = curr[0]! < curr[1]!;
  const nr: number = curr[idx]!;

  const diff = Math.abs(nr - curr[idx + 1]!);

  const isValidIncrement = isIncreasing ? nr < curr[idx + 1]! : nr > curr[idx + 1]!;
  const isValidDistance = diff >= 1 && diff <= 3;

  return isValidIncrement && isValidDistance;
};

export const part_1 = (data: string): number => {
  const reports = parseInput(data);

  const validCount = reports.reduce(
    (acc, curr) => (curr.every((_nr, idx): boolean => isValid(curr, idx)) ? acc + 1 : acc),
    0
  );

  console.log(validCount);

  return validCount;
};

export const part_2 = (data: string): number => {
  const reports = parseInput(data);

  const validCount = reports.reduce((acc, curr) => {
    let valid = curr.every((_nr, idx): boolean => isValid(curr, idx));

    if (valid) {
      return acc + 1;
    }

    valid = curr.some((_nr, idx): boolean => {
      const withoutCurrent = [...curr];
      withoutCurrent.splice(idx, 1);

      return withoutCurrent.every((_nr, idx): boolean => isValid(withoutCurrent, idx));
    });

    return valid ? acc + 1 : acc;
  }, 0);

  console.log(validCount);

  return validCount;
};

export function main() {
  const data = getInput(__dirname);
  part_1(data);
  part_2(data);
}

if (require.main === module) {
  main();
}
