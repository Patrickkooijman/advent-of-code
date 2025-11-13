import * as fs from 'node:fs';

export const getInput = (dir: string, file?: string): string => {
  return fs.readFileSync(`${dir}/${file ?? 'input.txt'}`, 'utf-8');
};

export const getExample = (dir: string, file?: string): string => {
  return fs.readFileSync(`${dir}/${file ?? 'example.txt'}`, 'utf-8');
};
