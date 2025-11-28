export const part_1 = (data: number[]): number => {
  const wheels = [...data];
  const first = wheels.shift()!;
  let last = first;
  let teeth = first * 2025;

  while (wheels.length) {
    const num = wheels.shift()!;
    teeth = (teeth * last) / num;
    last = num;
  }

  return Math.floor(teeth / first);
};

export const part_2 = (data: number[]): number => {
  const wheels = [...data];
  const last = wheels.pop()!;
  let current = last;
  let teeth = last * 10000000000000;

  while (wheels.length) {
    const num = wheels.pop()!;
    teeth = (teeth * current) / num;
    current = num;
  }

  return Math.ceil(teeth / last);
};

export const part_3 = (data: string[]): number => {
  const wheels = [...data];
  const first = parseInt(wheels.shift()!);
  let teeth = first * 100;

  while (wheels.length) {
    const curr = wheels.shift()!;
    if (curr.includes('|')) {
      const [inc, out] = curr.split('|').map(Number);
      teeth = (teeth / inc!) * out!;
    } else {
      teeth = teeth / Number(curr);
    }
  }

  return Math.floor(teeth);
};
