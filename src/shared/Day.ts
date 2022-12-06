import fetch from "./fetch";

export default abstract class Day {
    abstract readonly day: number;
    abstract readonly year: number
    private _input: Promise<any> | undefined;

    private input = (): Promise<any> => {
        if (!this._input) {
            this._input = fetch(this.day, this.year);
        }

        return this._input;
    }

    public execute = async (): Promise<any> => Promise.all([this.challengeOne(), this.challengeTwo()]);

    private challengeOne = (): Promise<any> => this.input().then(this.challengeOneHandler).then(res => this.log(1, res));
    private challengeTwo = (): Promise<any> => this.input().then(this.challengeTwoHandler).then(res => this.log(2, res));
    private log = (challenge: number, result: string | number): void => console.log(`Day ${this.day}, challenge ${challenge}: ${result}`);

    abstract challengeOneHandler(input: string): number | string;
    abstract challengeTwoHandler(input: string): number | string;
}
