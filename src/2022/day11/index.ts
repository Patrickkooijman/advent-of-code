import Day from '../../shared/Day';

export default class Day11 extends Day {
  day = 11;
  year = 2022;

  challengeOneHandler = (input: string): number => this.handle(input, 20, 1);

  challengeTwoHandler = (input: string): number => this.handle(input, 10_000, 2);

  handle = (input: string, amountOfRounds: number, challenge: number): number => {
    const monkeys: Map<string, Monkey> = this.parseInput(input);

    const divisionMethod: WorryDivision =
      challenge === 1
        ? this.challengeOneWorryLevelMethod
        : this.challengeTwoWorryLevelMethod(monkeys);

    for (let round = 1; round <= amountOfRounds; round++) {
      for (let monkeyNumber = 0; monkeyNumber < monkeys.size; monkeyNumber++) {
        const monkey = monkeys.get(`Monkey ${monkeyNumber}`);
        if (monkey) monkey.playRound(divisionMethod);
      }
    }

    const [a = 0, b = 0] = Array.from(monkeys)
      .map(([_, v]) => v.inspections)
      .sort((a, b) => b - a);

    return a * b;
  };

  private challengeOneWorryLevelMethod: WorryDivision = (worryLevel: number): number =>
    Math.floor(worryLevel / 3);
  private challengeTwoWorryLevelMethod = (monkeys: Map<string, Monkey>): WorryDivision => {
    const productOfDivisions: number = Array.from(monkeys)
      .map(([_, monkey]) => monkey.test)
      .reduce((a, c) => a * c, 1);

    return (worryLevel: number): number => worryLevel % productOfDivisions;
  };

  parseInput = (input: string): Map<string, Monkey> => {
    const monkeys = new Map();
    input
      .split(/\n\s*\n/)
      .map((monkey: string): string[] => monkey.trim().split(/\n/))
      .forEach((monkey: string[]): void => {
        const [n, i, o, t, wt, wf] = monkey;
        const name = n!.replace(':', '');
        const items = i!.match(/(\d+)/g)!.map(Number);
        const operation = (item: number): number => {
          const fn = o!.substring(19).replaceAll('old', String(item));
          return eval(fn);
        };
        const whenTrueMonkeyNumber = wt!.match(/(\d+)/g)!.map(Number).at(0);
        const whenTrueMonkeyName = `Monkey ${whenTrueMonkeyNumber}`;
        const whenTrueMonkey: Monkey = monkeys.has(whenTrueMonkeyName)
          ? monkeys.get(whenTrueMonkeyName)
          : monkeys.set(whenTrueMonkeyName, new Monkey(whenTrueMonkeyName)).get(whenTrueMonkeyName);

        const whenFalseMonkeyNumber = wf!.match(/(\d+)/g)!.map(Number).at(0);
        const whenFalseMonkeyName = `Monkey ${whenFalseMonkeyNumber}`;
        const whenFalseMonkey: Monkey = monkeys.has(whenFalseMonkeyName)
          ? monkeys.get(whenFalseMonkeyName)
          : monkeys
              .set(whenFalseMonkeyName, new Monkey(whenFalseMonkeyName))
              .get(whenFalseMonkeyName);

        const test = t!.match(/(\d+)/g)!.map(Number).at(0) || 1;

        if (!monkeys.has(name)) {
          monkeys.set(
            name,
            new Monkey(name, items, operation, test, whenTrueMonkey, whenFalseMonkey)
          );
        } else {
          const monkey = monkeys.get(name);
          monkey.items = items;
          monkey.operation = operation;
          monkey.test = test;
          monkey.whenTrue = whenTrueMonkey;
          monkey.whenFalse = whenFalseMonkey;
        }
      });

    return monkeys;
  };
}

class Monkey {
  name: string;
  items: number[] = [];
  operation: Operation = () => 0;
  test = 0;
  whenTrue: Monkey | null = null;
  whenFalse: Monkey | null = null;
  inspections = 0;

  constructor(
    name: string,
    items?: number[],
    operation?: Operation,
    test?: number,
    whenTrue?: Monkey,
    whenFalse?: Monkey
  ) {
    this.name = name;
    if (items) this.items = items;
    if (operation) this.operation = operation;
    if (test) this.test = test;
    if (whenTrue) this.whenTrue = whenTrue;
    if (whenFalse) this.whenFalse = whenFalse;
  }

  toMonkey = (item: number): Monkey => (item % this.test === 0 ? this.whenTrue! : this.whenFalse!);

  playRound = (worryDivisionMethod: WorryDivision): void => {
    this.items.forEach((item: number) => {
      const worryLevel: number = this.operation?.(item) || 0;
      const boredLevel: number = worryDivisionMethod(worryLevel);
      const toMonkey: Monkey = this.toMonkey(boredLevel);
      toMonkey.catchItem(boredLevel);

      this.inspections++;
    });

    this.items = [];
  };

  public catchItem = (item: number) => {
    this.items.push(item);
  };
}

type Operation = (value: number) => number;

type WorryDivision = (value: number) => number;
