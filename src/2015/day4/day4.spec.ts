import { challengeOneHandler } from "./";

describe('day 4', () => {
    describe('challenge one', () => {
        test.each([
            ['abcdef', 609_043],
            ['pqrstuv', 1_048_970],
        ])('%s should result in %i', (test: string, result: number) => {
            expect(challengeOneHandler(test)).toBe(result);
        });
    });
});
