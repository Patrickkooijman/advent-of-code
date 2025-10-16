import Day from '../../shared/Day';

export default class Day12 extends Day {
  day: number = 12;
  year: number = 2022;
  challengeOneHandler = (input: string): number => {
    const nodes: Node[] = this.parseInput(input);
    const start: Node = nodes.find((node: Node): boolean => node.name === 'S')!;
    const end: Node = nodes.find((node: Node): boolean => node.name === 'E')!;
    return this.bfs(start, end, nodes);
  };

  challengeTwoHandler = (input: string): number => {
    const nodes: Node[] = this.parseInput(input);
    const start: Node[] = nodes.filter((node: Node): boolean => ['S', 'a'].includes(node.name))!;
    const end: Node = nodes.find((node: Node): boolean => node.name === 'E')!;
    return Math.min(
      ...start
        .map((startNode: Node) => {
          nodes.forEach((node: Node) => {
            node.distance = 0;
            node.visited = false;
          });

          return this.bfs(startNode, end, nodes);
        })
        .filter(Boolean)
    );
  };

  private bfs = (start: Node, end: Node, nodes: Node[]): number => {
    const queue = [start];
    let current: Node;

    while (queue.length) {
      current = queue.shift()!;
      if (current.value === end.value) return current.distance;

      current.visited = true;
      const neighbors = this.findNeighbors(nodes, current);
      queue.push(
        ...neighbors.map(n => {
          n.visited = true;
          n.distance = current.distance + 1;
          return n;
        })
      );
    }
    return 0;
  };

  private findNeighbors = (nodes: Array<Node>, current: Node): Array<Node> => {
    const { x, y, value } = current;
    const candidates = [
      { x, y: y - 1 },
      { x, y: y + 1 },
      { x: x - 1, y },
      { x: x + 1, y },
    ];

    return nodes.filter(
      ({ x: nx, y: ny, value: nvalue, visited }: Node): boolean =>
        !visited && nvalue <= value + 1 && candidates.some(({ x, y }) => x === nx && y === ny)
    );
  };

  private parseInput = (input: string): Node[] => {
    const alphabet = 'SabcdefghijklmnopqrstuvwxyzE';
    return input.split('\n').flatMap(
      (line: string, y: number): Array<Node> =>
        line.split('').map(
          (name: string, x: number): Node => ({
            value: alphabet.indexOf(name),
            x,
            y,
            distance: 0,
            visited: false,
            name,
          })
        )
    );
  };
}

interface Node {
  x: number;
  y: number;
  value: number;
  name: string;
  distance: number;
  visited: boolean;
}
