import fetch from '../input/fetch'

export const challengeOne = (): Promise<number> => fetch("1").then(challengeOneHandler);

export function challengeOneHandler(input: string): number {
    return input.split('').reduce((acc: number, cur: string) => {
        if (cur === '(') {
            return acc + 1;
        }
        return acc - 1;
    }, 0);
}

export const challengeTwo = (): Promise<number> => fetch("1").then(challengeTwoHandler);

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
