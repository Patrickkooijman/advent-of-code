const parseInput = (data: string): number[] => {
  return data.trim().split('').map(Number);
};

export const part_1 = (data: string): number => {
  const numbers = parseInput(data);
  let lastFileIndex = 0;

  const files = numbers.flatMap((num: number, idx: number): (number | null)[] => {
    return new Array(num).fill(idx % 2 === 0 ? lastFileIndex++ : null) as (number | null)[];
  });

  const rearranged = files.map((file, idx, self) => {
    if (file !== null) {
      return file;
    }

    let last = self.pop();
    while (last === null && self.length > idx + 1) {
      last = self.pop();
    }

    return last;
  });

  return rearranged.reduce((acc: number, curr, idx) => {
    return acc + (curr ?? 0) * idx;
  }, 0);
};

export const part_2 = (data: string): number => {
  console.log(data);

  return 0;
};
