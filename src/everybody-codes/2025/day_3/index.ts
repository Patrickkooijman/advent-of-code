export const part_1 = (data: number[]): number => {
  return data
    .sort((a, b) => b - a)
    .reduce((acc, curr, idx, self) => {
      if (idx === 0 || curr < (self[idx - 1] ?? 0)) {
        return acc + curr;
      }
      return acc;
    }, 0);
};

export const part_2 = (data: number[]): number => {
  let count = 0;

  return data
    .sort((a, b) => a - b)
    .reduce((acc, curr, idx, self) => {
      if (count !== 20 && (idx === 0 || curr > (self[idx - 1] ?? 0))) {
        count++;
        return acc + curr;
      }
      return acc;
    }, 0);
};

export const part_3 = (data: number[]): number => {
  const packages = [...data].sort((a, b) => a - b);
  let pacageCount = 0;

  while (packages.length) {
    pacageCount++;
    let last = packages.pop()!;

    for (let i = packages.length - 1; i >= 0; i--) {
      if (packages[i]! < last) {
        last = packages[i]!;
        packages.splice(i, 1);
      }
    }
  }

  return pacageCount;
};
