import { getInput } from '../utils';

interface RegexResult {
  match: string;
  group: string | undefined;
}

const calculate = (input: RegexResult[]): number => {
  return input
    .map(({ group }) => group)
    .map(match => eval(`(function(a,b) { return a * b; })(${match})`) as number)
    .reduce((acc: number, curr: number): number => acc + curr, 0);
};

const parseInput = (data: string): RegexResult[] => {
  return data
    .matchAll(/mul\((\d+,\d+)\)|don't\(\)|do\(\)/g)
    .toArray()
    .map(([match, group]) => ({
      match,
      group,
    }));
};

export const part_1 = (data: string): number => {
  const input = parseInput(data).filter(i => !i.match.startsWith('do'));

  const sum = calculate(input);

  console.log(sum);

  return sum;
};

export const part_2 = (data: string): number => {
  let active = true;

  const input = parseInput(data).filter(i => {
    if (i.match === "don't()") {
      active = false;
      return false;
    }
    if (i.match === 'do()') {
      active = true;
      return false;
    }

    return active;
  });

  const sum = calculate(input);

  console.log(sum);

  return sum;
};

function main() {
  const data = getInput(__dirname);
  part_1(data);
  part_2(data);
}

if (require.main === module) {
  main();
}
