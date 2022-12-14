import Day from '../../shared/Day';

export default class Day12 extends Day {
    day: number = 12;
    year: number = 2022;

    challengeOneHandler = (input: string): number => this.bfs(this.parseInput(input));

    challengeTwoHandler = (input: string): number => this.bfs(this.parseInput(input));

    private bfs = (grid: Grid) : number => {
        const { start, end, nodes } = grid
        start.visited = true;
        const queue = [start];
        let current: Node;

        do {
            current = queue.shift()!
            console.log({
                current,
                l: queue.length
            })

            const neighbors = this.findNeighbors(nodes, current);
            queue.push(...neighbors.map(n => {
                n.visited = true;
                n.distance = current.distance + 1;

                return n;
            }));

        }
        while (queue.length && current !== end);

        return end.distance;
    }

    private findNeighbors = (nodes: Array<Node>, current: Node): Array<Node> => {
        const { x, y, value } = current;
        const candidates = [{ x, y: y - 1},
            { x, y: y + 1},
            { x: x - 1, y },
            { x: x + 1, y}];

        return nodes
            .filter(({ x: nx, y: ny, value: nvalue, visited }: Node): boolean => !visited && (value === nvalue || value + 1 === nvalue) &&
        candidates.some(({ x, y }) => x === nx && y === ny));
    }

    private parseInput = (input: string): Grid => {
        let start: Node, end: Node;
        const alphabet = 'SabcdefghijklmnopqrstuvwxyzE';

        const nodes = input.split('\n').flatMap((line: string, y: number): Array<Node> => {
           return  line.split('').map((d: string, x: number): Node => {
                const node: Node = {
                    value: alphabet.indexOf(d),
                    x,
                    y,
                    distance: 0,
                    visited: false,
                };

                if (d === 'S') start = node;
                if (d === 'E') end = node;

                return node;
            })
        });

        return {
            start: start!,
            end: end!,
            nodes,
        };
    }
}

interface Grid {
    start: Node
    end: Node
    nodes: Array<Node>
}

interface Node {
    x: number
    y: number
    value: number
    distance: number
    visited: boolean;
}
