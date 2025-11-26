interface Instruction {
  direction: string;
  amount: number;
}

interface Input {
  names: string[];
  instructions: Instruction[];
}

const parseInput = (data: string): Input => {
  const [names, _, inst]: string[] = data.trim().split('\n');
  const instructions: Instruction[] = inst!.split(',').map(i => {
    const [direction = '', ...amount] = i.split('');

    return {
      direction,
      amount: Number(amount.join('')),
    };
  });

  return {
    names: names!.split(','),
    instructions,
  };
};

export const part_1 = (data: string): string => {
  const input: Input = parseInput(data);

  let currentIndex = 0;
  const maxIndex = input.names.length - 1;

  for (const instruction of input.instructions) {
    if (instruction.direction === 'R') {
      currentIndex = Math.min(currentIndex + instruction.amount, maxIndex);
    } else {
      currentIndex = Math.max(currentIndex - instruction.amount, 0);
    }
  }

  return input.names[currentIndex]!;
};

export const part_2 = (data: string): string => {
  const input: Input = parseInput(data);

  let currentIndex = 0;
  const namesLength = input.names.length;

  for (const instruction of input.instructions) {
    if (instruction.direction === 'R') {
      currentIndex = (currentIndex + instruction.amount) % namesLength;
    } else {
      currentIndex = (namesLength + namesLength + currentIndex - instruction.amount) % namesLength;
    }
  }

  return input.names[currentIndex]!;
};

export const part_3 = (data: string): string => {
  const input: Input = parseInput(data);

  const namesLength = input.names.length;

  for (const instruction of input.instructions) {
    let indexToSwap = 0;
    if (instruction.direction === 'R') {
      indexToSwap = instruction.amount % namesLength;
    } else {
      indexToSwap = namesLength - instruction.amount;
    }
    const temp = input.names.at(0)!;
    input.names[0] = input.names.at(indexToSwap)!;
    input.names[indexToSwap] = temp;
  }

  return input.names.at(0)!;
};
