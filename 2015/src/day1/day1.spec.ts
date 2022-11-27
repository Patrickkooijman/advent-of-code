import {challengeOneHandler, challengeTwo, challengeTwoHandler} from "./";

describe('day 1', () => {
    describe('challenge one', () => {
        test.each([
            ["(())", 0],
            ['()()', 0],
            ["(((", 3],
            ["(()(()(", 3],
            ["))(((((", 3],
            ["())", -1],
            ["))(", -1],
            [")))", -3],
            [")())())", -3]
        ])('%s should result in %i', (test: string, result: number) => {
            expect(challengeOneHandler(test)).toBe(result);
        });
    });

    describe('challenge two', () => {
        test.each([
            [")", 1],
            ['()()))', 5],
        ])('%s should result in %i', (test: string, result: number) => {
            expect(challengeTwoHandler(test)).toBe(result);
        });
    });
});
