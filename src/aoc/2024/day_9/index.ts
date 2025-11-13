import { File } from './types.ts';

const parseInputTwo = (data: string): File[] => {
  let lastFileIndex = 0;

  return data
    .trim()
    .split('')
    .map(Number)
    .map(
      (size: number, idx: number): File => ({
        size, // size of the block
        value: idx % 2 === 0 ? lastFileIndex++ : null, // file index or null for free block
      })
    );
};

export const part_1 = (data: string): number => {
  const files = parseInputTwo(data).flatMap(
    file => new Array(file.size).fill(file.value) as (number | null)[]
  );

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
  const files = parseInputTwo(data);
  const filesToReplace = files.filter(file => file.value !== null);

  for (const fileToReplace of filesToReplace.toReversed()) {
    const fileToReplaceIndex = files.indexOf(fileToReplace);

    const firstApplicableEmptyBlock = files.find((file, index) => {
      return file.value === null && file.size >= fileToReplace.size && index < fileToReplaceIndex;
    });

    if (!firstApplicableEmptyBlock) {
      // No applicable empty block found, skip this file
      continue;
    }

    const firstApplicableEmptyBlockIndex = files.indexOf(firstApplicableEmptyBlock);

    if (firstApplicableEmptyBlock.size === fileToReplace.size) {
      // Perfect fit, just swap
      files[firstApplicableEmptyBlockIndex] = fileToReplace;
      files[fileToReplaceIndex] = firstApplicableEmptyBlock;
      continue;
    }

    // Split the empty block
    firstApplicableEmptyBlock.size -= fileToReplace.size;
    files[fileToReplaceIndex] = { ...fileToReplace, value: null };
    files.splice(firstApplicableEmptyBlockIndex, 0, fileToReplace);
  }

  return files
    .filter(file => file.size > 0)
    .flatMap(file => new Array(file.size).fill(file.value) as (number | null)[])
    .reduce((acc: number, curr, idx) => {
      return acc + (curr ?? 0) * idx;
    }, 0);
};
