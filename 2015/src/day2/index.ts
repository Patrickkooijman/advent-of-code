import fetch from '../input/fetch'

export const challengeOne = (): Promise<number> => fetch("2").then(challengeOneHandler);

export const  challengeOneHandler = (input: string): number =>
   input.split('\n').filter(Boolean).map(calculateWrapping).reduce((acc: number, cur: number): number => acc + cur, 0);

function calculateWrapping(input: string): number {
    const [l, h, b ]: lhb = parseInput(input);

    const lwSquare: number = l * b;
    const whSquare: number = b * h;
    const lhSquare: number = l * h;
    const smallest: number = Math.min(lwSquare, whSquare, lhSquare);

    return 2 * lwSquare + 2 * whSquare + 2 * lhSquare + smallest;
}

export const challengeTwo = (): Promise<number> => fetch("2").then(challengeTwoHandler);

export const challengeTwoHandler = (input: string): number =>
    input.split('\n').filter(Boolean).map(calculateRibbon).reduce((acc: number, cur: number): number => acc + cur, 0);

function calculateRibbon(input: string): number {
    const [l, h, b ]: lhb = parseInput(input);

    const [ xs, sm ]: number[] = [ l, h, b ].sort((a, b) => a - b);
    const sqrRoot: number = l * h * b;

    return 2 * xs + 2 * sm + sqrRoot;
}

type lhb = [l: number, h: number, b: number];

function parseInput(input: string): lhb {
    const match: Array<string> = new RegExp(/([0-9]+)x([0-9]+)x([0-9]+)/gm).exec(input) || [];
    const [_, l, h, b]: number[] = match.map((m: string): number => parseInt(m));

    return [l, h, b];
}

export default {
    challengeOne,
    challengeTwo,
}
