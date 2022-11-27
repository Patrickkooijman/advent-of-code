import fetch from '../input/fetch'

export const challengeOne = (): Promise<string> => fetch("1").then(challengeOneHandler).then(res => `Day 3, challenge 1: ${res}`);

export function challengeOneHandler(input: string): number {
    return input.split('').reduce((acc: number, cur: string) => {
        if (cur === '(') {
            return acc + 1;
        }
        return acc - 1;
    }, 0);
}

export const challengeTwo = (): Promise<string> => fetch("1").then(challengeTwoHandler).then(res => `Day 3, challenge 1: ${res}`);

export function challengeTwoHandler(input: string): number {
    let currentFloor: number = 0;

    return input.split('').findIndex((value: string): boolean => {
        if (value === '(') {
            currentFloor++;
        } else {
            currentFloor--
        }

        return currentFloor === -1;
    }) + 1;
}

export default {
    challengeOne,
    challengeTwo,
}
