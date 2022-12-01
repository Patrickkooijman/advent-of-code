import {challengeOneHandler, challengeTwoHandler} from "./index";

describe('day 1', () => {
    describe('challenge one', () => {
        test('should result in 24000', () => {
            expect(challengeOneHandler(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`)).toBe(24000);
        });
    });

    describe('challenge two', () => {
        test('should result in 45000', () => {
            expect(challengeTwoHandler(`1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`)).toBe(45000);
        });
    });
});