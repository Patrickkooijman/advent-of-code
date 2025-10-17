import fetch from './fetch';

export default abstract class Day {
  abstract readonly day: number;
  abstract readonly year: number;
  private _input: Promise<string> | undefined;

  private readonly input = (): Promise<string> => {
    this._input ??= fetch(this.day, this.year);

    return this._input;
  };
  public execute = async (): Promise<string[]> =>
    Promise.all([this.challengeOne(), this.challengeTwo()]);

  private readonly challengeOne = (): Promise<string> =>
    this.input()
      .then(this.challengeOneHandler.bind(this))
      .then(res => this.log(1, res));
  private readonly challengeTwo = (): Promise<string> =>
    this.input()
      .then(this.challengeTwoHandler.bind(this))
      .then(res => this.log(2, res));
  private readonly log = (challenge: number, result: string | number): string =>
    `Day ${this.day}, challenge ${challenge}: ${result}`;

  abstract challengeOneHandler(input: string): number | string;
  abstract challengeTwoHandler(input: string): number | string;
}
