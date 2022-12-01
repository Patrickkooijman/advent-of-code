import fetch from '../input/fetch'

export const challengeOne = (): Promise<string> => fetch('1').then(challengeOneHandler).then(res => `Day 1, challenge 1: ${res}`);

export function challengeOneHandler(input: string): number {
    return Math.max(...toValues(input));
}

export const challengeTwo = (): Promise<string> => fetch("1").then(challengeTwoHandler).then(res => `Day 1, challenge 1: ${res}`);

export function challengeTwoHandler(input: string): number {
    const values: Array<number> = toValues(input);

    return values.sort((a, b) => b - a).slice(0, 3).reduce((a, b) => a + b, 0);
}

function toValues(input: string ): Array<number> {
    let currIndex: number = 0;

    return  input.split('\n').reduce((acc: Array<number>, cur: string) => {
        if (cur === '') {
            currIndex++;
        } else {
            acc[currIndex] = (acc[currIndex] || 0) + parseInt(cur);
        }
        return acc;
    }, []);
}

export default {
    challengeOne,
    challengeTwo,
}
