const parseInput = (data: string): string[][] => {
  return data
    .trim()
    .split('\n')
    .map(line => line.trim().split(''));
};

export const part_1 = (data: string): number => {
  const grid = parseInput(data);
  let count = 0;
  const phrase = 'XMAS';
  const directions = [
    [0, 1], // right
    [1, 1], // down-right
    [1, 0], // down
    [1, -1], // down-left
    [0, -1], // left
    [-1, -1], // up-left
    [-1, 0], // up
    [-1, 1], // up-right
  ];

  const rows = grid.length;
  const cols = grid[0]!.length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      for (const [dr, dc] of directions) {
        let found = true;
        for (let k = 0; k < phrase.length; k++) {
          const nr = r + dr! * k;
          const nc = c + dc! * k;
          if (nr < 0 || nr >= rows || nc < 0 || nc >= cols || grid[nr]![nc] !== phrase[k]) {
            found = false;
            break;
          }
        }
        if (found) count++;
      }
    }
  }

  return count;
};

export const part_2 = (data: string): number => {
  const grid = parseInput(data);

  let count = 0;
  const rows = grid.length;
  const cols = grid[0]!.length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const a = r - 1;
      const l = c - 1;
      const b = r + 1;
      const ri = c + 1;
      if (a >= 0 && b < rows && l >= 0 && ri < cols) {
        const ltrb = `${grid[a]![l]}${grid[r]![c]}${grid[b]![ri]}`;
        const rtlb = `${grid[a]![ri]}${grid[r]![c]}${grid[b]![l]}`;

        if ([ltrb, rtlb].every(seq => ['MAS', 'SAM'].includes(seq))) {
          count++;
        }
      }
    }
  }
  return count;
};
