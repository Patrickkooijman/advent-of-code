import { methods, Node } from './node.ts';
import { Equation, State } from './types.ts';

const parseInput = (data: string): { sum: number; numbers: number[] }[] => {
  return data
    .trim()
    .split('\n')
    .map(line => line.trim())
    .flatMap(line => {
      const [sum, numbers] = line.split(':');

      return {
        sum: Number(sum),
        numbers: numbers!.trim().split(' ').map(Number),
      };
    });
};

export const part_1 = (data: string): number => {
  const equations: Equation[] = parseInput(data);

  const filteredEquations = equations.filter(equation => {
    const rootNode = new Node(equation.sum, [...equation.numbers]);

    return rootNode.execute([]) === State.MATCH;
  });

  return filteredEquations.map(({ sum }) => sum).reduce((acc, curr) => acc + curr, 0);
};

export const part_2 = (data: string): number => {
  methods.push((a: number, b: number): number => Number(`${a}${b}`));

  return part_1(data);
};
