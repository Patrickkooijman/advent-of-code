import Day from './index';
describe('day 7', () => {
    describe('challenge one', () => {
        test('should result in 95437', () => {
            expect(new Day().challengeOneHandler(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)).toBe(95437);
        });
    });
    describe('challenge two', () => {
        test('should result in 24933642', () => {

            expect(new Day().challengeTwoHandler(`$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`)).toBe(24933642);
        });
    });
});