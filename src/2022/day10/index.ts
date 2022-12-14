import Day from '../../shared/Day';

export default class Day10 extends Day {
    day: number = 10;
    year: number = 2022;

    challengeOneHandler = (input: string): number => {
        let X: number = 1;
        const cycles: Array<number> = [X];

        const instructions: Array<Instruction> = this.parseInput(input);

        instructions.forEach(({ command, value}: Instruction) => {
            switch (command) {
                case 'noop':
                    cycles.push(X);
                    break;
                case 'addx':
                    cycles.push(X);
                    cycles.push(X)

                    X += value || 0;
                    break;
                default:
                    throw Error;
            }
        })
        return [20, 60, 100, 140, 180, 220]
            .map(value => value * (cycles[value] || 0))
            .reduce((a, c) => a + c);
    };

    challengeTwoHandler = (input: string): string => {
            let spritePosition: number = 0;
            const cycles: Array<number> = [];

            const instructions: Array<Instruction> = this.parseInput(input);

            instructions.forEach(({ command, value}: Instruction) => {

                switch (command) {
                    case 'noop':
                        cycles.push(spritePosition);
                        break
                    case 'addx':
                        cycles.push(spritePosition);
                        cycles.push(spritePosition)

                        spritePosition += value || 0;
                        break;
                    default:
                        throw Error;
                }

            })

        const board: string[] = cycles.map((number: number, index: number): string => {
            const curr = Math.floor(index / 40) * 40 + number;
            const isVisible = [ curr, curr + 1, curr + 2 ].includes(index);
            return isVisible ? '#' : '.';
        });

        return '\n' + this.splitToLines(board).join('\n');
    }

    parseInput = (input: string): Array<Instruction> =>
        input
            .split('\n')
            .filter(Boolean)
            .map((line: string): Instruction => {
                const [command = '', value] = line.split(' ');
                return {
                    command,
                    value: Number(value) || null,
                };
            });

    private splitToLines = (digits: Array<string>): Array<string> => {
        const length = 40;
        const array = [...digits];
        const current = array.splice(-length);

        if (!array.length) {
            return [current.join(' ')];
        }

        return this.splitToLines(array).concat([current.join(' ')]);
    }
}

interface Instruction {
    command: string,
    value: number | null
}
