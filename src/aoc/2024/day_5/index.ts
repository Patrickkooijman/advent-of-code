interface Order {
  rules: Map<number, number[]>;
  orders: number[][];
}

const parseInput = (data: string): Order => {
  const [rulesstr, ordersstr] = data.split('\n\n');

  const rules = rulesstr!.split('\n').reduce((acc, curr) => {
    const [page, before]: number[] = curr.split('|').map(Number);

    if (!acc.has(page!)) {
      acc.set(page!, []);
    }

    const arr = acc.get(page!)!;
    arr.push(before!);

    return acc;
  }, new Map<number, number[]>());

  const orders = ordersstr!
    .trim()
    .split('\n')
    .map(line => line.split(',').map(Number));

  return {
    rules,
    orders,
  };
};

const isValidOrder = (order: number[], rules: Map<number, number[]>): boolean => {
  return order.every((item, idx) => {
    if (idx === 0) {
      return true;
    }

    const rulesForItem: number[] | undefined = rules.get(item);

    if (!rulesForItem) {
      return true;
    }

    const befores = new Set<number>(order.slice(0, idx));

    return rulesForItem.every(rule => !befores.has(rule));
  });
};

const mapToCorrectOrder = (orders: number[], rules: Map<number, number[]>): number[] => {
  const correctOrder: number[] = [];

  for (const order of orders) {
    const rulesForOrder = rules.get(order) ?? [];

    for (let idx = 0; idx < correctOrder.length; idx++) {
      const co = correctOrder[idx]!;

      if (rulesForOrder.includes(co)) {
        correctOrder.splice(idx, 0, order);
        break;
      }
    }
    if (!correctOrder.includes(order)) {
      correctOrder.push(order);
    }
  }

  return correctOrder;
};

export const part_1 = (data: string): number => {
  const input: Order = parseInput(data);

  const validOrders = input.orders.filter(order => isValidOrder(order, input.rules));

  return validOrders.reduce((acc, curr) => {
    return acc + curr[Math.floor(curr.length / 2)]!;
  }, 0);
};

export const part_2 = (data: string): number => {
  const input: Order = parseInput(data);

  const invalidOrders = input.orders.filter(order => !isValidOrder(order, input.rules));

  return invalidOrders
    .map(order => mapToCorrectOrder(order, input.rules))
    .reduce((acc, curr) => {
      return acc + curr[Math.floor(curr.length / 2)]!;
    }, 0);
};
