import Graph from './Graph.ts';

const parseInput = (data: string): Graph => {
  return new Graph(data);
};

export const part_1 = (data: string): number => {
  let count = 0;
  const graph: Graph = parseInput(data);

  for (const [key, item] of graph.items.entries()) {
    if (item.value === 0) {
      count += graph.executeBFS(key);
    }
  }

  return count;
};

export const part_2 = (data: string): number => {
  console.log(data);

  return 0;
};
