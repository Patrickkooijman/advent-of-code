import { Day4 } from "./index";

describe('day 4', () => {
    describe('challenge one', () => {
        test('should result in 157', () => {
            expect(new Day4().challengeOneHandler(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)).toBe(157);
        });
    });

    describe('challenge two', () => {
        test('should result in 70', () => {
            expect(new Day4().challengeTwoHandler(`vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`)).toBe(70);
        });
    });
});
