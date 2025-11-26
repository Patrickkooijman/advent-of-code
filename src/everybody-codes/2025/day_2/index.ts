export const add = ([X1, Y1]: number[], [X2, Y2]: number[]): number[] => {
  return [X1! + X2!, Y1! + Y2!];
};

export const multiply = ([X1, Y1]: number[], [X2, Y2]: number[]): number[] => {
  return [X1! * X2! - Y1! * Y2!, X1! * Y2! + Y1! * X2!];
};

export const divide = ([X1, Y1]: number[], [X2, Y2]: number[]): number[] => {
  return [parseInt((X1! / X2!).toString()), parseInt((Y1! / Y2!).toString())];
};

export const part_1 = (A: number[]): string => {
  let result = [0, 0];
  const instructions = ['*', '/', '+'];
  const rounds = 3;

  for (let i = 0; i < rounds; i++) {
    result = instructions.reduce((acc: number[], curr: string): number[] => {
      switch (curr) {
        case '*':
          return multiply(acc, acc);
        case '/':
          return divide(acc, [10, 10]);
        case '+':
          return add(acc, A);
        default:
          return acc;
      }
    }, result);
  }

  console.log(`[${result.join(',')}]`);

  return `[${result.join(',')}]`;
};

const verifyResult = (x: number, y: number, rounds: number): Promise<boolean> => {
  return new Promise(resolve => {
    let result = [0, 0];
    const instructions = ['*', '/', '+'];
    let valid = true;

    for (let i = 0; i < rounds; i++) {
      valid = true;
      result = instructions.reduce((acc: number[], curr: string): number[] => {
        switch (curr) {
          case '*':
            return multiply(acc, acc);
          case '/':
            return divide(acc, [100000, 100000]);
          case '+':
            return add(acc, [x, y]);
          default:
            return acc;
        }
      }, result);

      if (result.some(res => res > 1000000 || res < -1000000)) {
        valid = false;
        break;
      }
    }

    resolve(valid);
  });
};

const calucalate = async (A: number[], step: number): Promise<number> => {
  const start = A;
  const end = add(A, [1000, 1000]);
  // eslint-disable-next-line prefer-const
  let [_, y = 0]: number[] = start;
  const [xEnd = 0, yEnd = 0]: number[] = end;
  let counter = 0;
  const promises: Promise<boolean>[] = [];

  while (y <= yEnd) {
    let [x = 0]: number[] = start;
    while (x <= xEnd) {
      promises.push(verifyResult(x, y, 100));
      x += step;
    }
    y += step;
  }

  const result = await Promise.all(promises);

  result.forEach(valid => {
    counter += valid ? 1 : 0;
  });

  return counter;
};

export const part_2 = async (A: number[]): Promise<number> => {
  return calucalate(A, 10);
};

export const part_3 = async (A: number[]): Promise<number> => {
  return calucalate(A, 1);
};
