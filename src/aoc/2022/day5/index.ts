import Day from '../../../shared/Day.ts';

export class Day5 extends Day {
  day = 5;
  year = 2022;

  challengeOneHandler = (input: string): string => {
    const [stacks, actions]: Data = this.extractData(input);
    return this.executeActions(actions, stacks);
  };

  challengeTwoHandler = (input: string): string => {
    const [stacks, actions]: Data = this.extractData(input);
    return this.executeActions9001(actions, stacks);
  };

  private extractData = (input: string): Data => {
    const stackLines: string[] = [];
    let stackNumbers: number[] = [];
    const actions: string[] = [];

    input
      .split('\n')
      .filter(Boolean)
      .forEach((line: string) => {
        switch (line.trim()[0]) {
          case '[':
            stackLines.push(line);
            break;
          case '1':
            stackNumbers = (line.match(/(\d+)/g) || []).map(l => parseInt(l));
            break;
          case 'm':
            actions.push(line);
            break;
        }
      });

    return [this.getStacks(stackNumbers, stackLines), this.getActions(actions)];
  };

  private getStacks(stackNumbers: number[], stackLines: string[]): Map<number, string[]> {
    return stackNumbers.reduce(
      (acc: Map<number, string[]>, curr: number): Map<number, string[]> => {
        acc.set(curr, this.getStack(stackLines, curr));
        return acc;
      },
      new Map()
    );
  }

  private getStack = (stackLines: string[], number: number): string[] =>
    stackLines
      .slice()
      .reverse()
      .map((line: string): string => line[number * 4 - 3] || '')
      .filter(l => Boolean(l.trim()));

  private getActions = (actions: string[]): Action[] =>
    actions.map(action => {
      const [amount = 0, from = 0, to = 0] = (action.match(/(\d+)/g) || []).map(i => parseInt(i));

      return {
        amount,
        from,
        to,
      };
    });

  private executeActions = (actions: Action[], stacks: Map<number, string[]>): string => {
    actions.forEach(({ amount, from, to }: Action) => {
      for (let i = 1; i <= amount; i++) {
        const number = stacks.get(from)?.pop();
        if (!number) throw Error;
        stacks.get(to)?.push(number);
      }
    });

    return this.getResult(stacks);
  };
  private executeActions9001 = (actions: Action[], stacks: Map<number, string[]>): string => {
    actions.forEach(({ amount, from, to }: Action) => {
      const numbers = stacks.get(from)?.splice(-amount);
      if (!numbers) throw Error;
      stacks.get(to)?.push(...numbers);
    });

    return this.getResult(stacks);
  };

  private getResult = (stacks: Map<number, string[]>): string =>
    Array.from(stacks)
      .map(([_, value]) => value.at(-1))
      .join('');
}

interface Action {
  amount: number;
  from: number;
  to: number;
}

type Data = [stacks: Map<number, string[]>, actions: Action[]];

export default Day5;
