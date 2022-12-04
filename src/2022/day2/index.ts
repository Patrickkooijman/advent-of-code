import Day from "../../shared/Day";

export class Day2 extends Day {
    day: number = 2;
    year = 2022;

    challengeOneHandler(input: string): number {
        return input
            .split(('\n'))
            .map(round => round.split(""))
            .filter(([a, b]) => !!a && !!b)
            .map(([a, _, b]: string[]): Match =>
                [OpponentShape[a as keyof typeof OpponentShape], PlayerShape[b as keyof typeof PlayerShape]])
            .reduce((acc: number, [opponent, player]: Match): number =>
                acc + GameScore[this.toGameResult(opponent, player)] + ShapeScore[player], 0);
    }

    challengeTwoHandler(input: string): number {
        return input
            .split(('\n'))
            .map(round => round.split(""))
            .filter(([a, b]) => !!a && !!b)
            .map(([a, _, b]: string[]): MatchResult =>
                [OpponentShape[a as keyof typeof OpponentShape], ExpectedResult[b as keyof typeof ExpectedResult]])
            .reduce((acc: number, [opponent, result]: MatchResult): number =>
                acc + GameScore[result] + ShapeScore[this.toExpectedShape(opponent, result)], 0);
    }

    toGameResult(opponent: Shape, player: Shape): GameResult {
        switch (true) {
            case opponent === Shape.Rock && player === Shape.Paper:
                return GameResult.WIN;
            case opponent === Shape.Rock && player === Shape.Scissors:
                return GameResult.LOSS;

            case opponent === Shape.Paper && player === Shape.Rock:
                return GameResult.LOSS;
            case opponent === Shape.Paper && player === Shape.Scissors:
                return GameResult.WIN;

            case opponent === Shape.Scissors && player === Shape.Rock:
                return GameResult.WIN;
            case opponent === Shape.Scissors && player === Shape.Paper:
                return GameResult.LOSS;
            default:
                return GameResult.DRAW;
        }
    }

    toExpectedShape(opponent: Shape, expectedResult: GameResult): Shape {
        switch (true) {
            case opponent === Shape.Rock && expectedResult === GameResult.LOSS:
                return Shape.Scissors;
            case opponent === Shape.Rock && expectedResult === GameResult.WIN:
                return Shape.Paper;

            case opponent === Shape.Paper && expectedResult === GameResult.LOSS:
                return Shape.Rock;
            case opponent === Shape.Paper && expectedResult === GameResult.WIN:
                return Shape.Scissors

            case opponent === Shape.Scissors && expectedResult === GameResult.LOSS:
                return Shape.Paper;
            case opponent === Shape.Scissors && expectedResult === GameResult.WIN:
                return Shape.Rock;
            default:
                return opponent;
        }
    }
}

type Match = [Shape, Shape];
type MatchResult = [Shape, GameResult];

enum Shape {
    Rock,
    Paper,
    Scissors,
}

enum GameResult {
    WIN,
    LOSS,
    DRAW
}

const OpponentShape = {
    A: Shape.Rock,
    B: Shape.Paper,
    C: Shape.Scissors
} as const

const PlayerShape = {
    X: Shape.Rock,
    Y: Shape.Paper,
    Z: Shape.Scissors
} as const

const ExpectedResult = {
    X: GameResult.LOSS,
    Y: GameResult.DRAW,
    Z: GameResult.WIN
}

const ShapeScore = {
    [Shape.Rock]: 1,
    [Shape.Paper]: 2,
    [Shape.Scissors]: 3
} as const

const GameScore = {
    [GameResult.WIN]: 6,
    [GameResult.LOSS]: 0,
    [GameResult.DRAW]: 3
} as const
