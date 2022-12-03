import fetch from '../input/fetch'

const day: number = 3;

export const challengeOne = (): Promise<string> => fetch(day).then(challengeOneHandler).then(res => `Day ${day}, challenge 1: ${res}`);

export function challengeOneHandler(input: string): number {
    return input
        .split(('\n'))
        .filter(Boolean)
        .map((bag: string): ItemsInBag => [bag.split('').splice(bag.length / 2), bag.split('').slice(0, bag.length / 2)])
        .map(([bagOne = [], bagTwo = []]: string[][]) => bagOne.find(item => bagTwo.includes(item)))
        .map((item: string = "!"): number => valueItemInBag(item))
        .reduce((acc: number, curr: number): number => acc + curr, 0);
}

export const challengeTwo = (): Promise<string> => fetch(day).then(challengeTwoHandler).then(res => `Day ${day}, challenge 2: ${res}`);

export function challengeTwoHandler(input: string): number {
    const bags: Array<Array<string>> = input
        .split(('\n'))
        .filter(Boolean)
        .map(i => i.split(''));

    return spliceIntoChunks(bags, 3)
        .map((group: string[][] = []): string =>
            (group.at(0) || []).find(item =>
                (group.at(1) || []).includes(item)
                &&  (group.at(2) || []).includes(item)) || "!")
        .map((item: string = "!"): number => valueItemInBag(item))
        .reduce((acc: number, curr: number): number => acc + curr, 0);
}

type ItemsInBag = [bagOne: string[], bagTwo: string[]];

const valueItemInBag = (item: string): number => "!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".indexOf(item);

const spliceIntoChunks = (arr: string[][], chunkSize:number): Array<Array<Array<string>>> => {
    const res = [];
    while (arr.length > 0) {
        const chunk = arr.splice(0, chunkSize);
        res.push(chunk);
    }
    return res;
}


export default {
    challengeOne,
    challengeTwo,
}
