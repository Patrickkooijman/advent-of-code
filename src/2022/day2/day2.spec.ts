import { challengeOneHandler, challengeTwoHandler } from "./index";

describe('day 2', () => {
    describe('challenge one', () => {
        test('should result in 15', () => {
            expect(challengeOneHandler(`A Y
B X
C Z`)).toBe(15);
        });
    });

    describe('challenge two', () => {
        test('should result in 12', () => {
            expect(challengeTwoHandler(`A Y
B X
C Z`)).toBe(12);
        });
    });
});