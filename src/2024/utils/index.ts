import * as fs from 'node:fs';

export const getInput = (dir: string): string => {

    return fs.readFileSync(`${dir}/input.txt`, 'utf-8');
}

export const getExample = (dir: string): string => {
    return fs.readFileSync(`${dir}/example.txt`, 'utf-8');
}
