import Day from './index';
describe('day 12', () => {
    describe('challenge one', () => {
        test('should result in 31', () => {
            expect(new Day().challengeOneHandler(`Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi`)).toBe(31);
        });
    });

    describe('challenge two', () => {
        test('should result in 2713310158', () => {
            expect(new Day().challengeTwoHandler(``)).toBe(2713310158);
        });
    });
});
