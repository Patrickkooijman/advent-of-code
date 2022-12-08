import Day from '../../shared/Day';

export default class Day8 extends Day {
    day: number = 8;
    year: number = 2022;

    challengeOneHandler = (input: string): number => {
        const trees = this.parseInput(input);

        return trees.flatMap(t => t).map(tree => this.treeIsVisible(tree, trees)).filter(Boolean).length;
    };
    challengeTwoHandler = (input: string): number => {
        const trees = this.parseInput(input);

        return Math.max(...trees.flatMap(t => t).map(tree => this.scenicScore(tree, trees)));
    };

    private parseInput = (input: string): Tree[][] => {
        return input
            .split('\n')
            .map((line: string, yPos: number) =>
                line
                    .split('')
                    .filter(Boolean)
                    .map(Number)
                    .map((height: number, xPos: number)=> ({
                        height,
                        xPos,
                        yPos
                    }))
            );
    }

    private treeIsVisible = (tree: Tree, trees: Tree[][]): boolean => {
        const { xPos, yPos, height } = tree;
        const left: number[] = (trees[yPos]|| []).slice(0, xPos).map(t => t.height);
        const right: number[] = (trees[yPos]|| []).slice(xPos + 1).map(t => t.height);
        const above: number[] = trees.slice(0, yPos).map(t => t[xPos]).map(t => t!.height);
        const below: number[] = trees.slice(yPos + 1).map(t => t[xPos]).filter(Boolean).map(t => t!.height);

        return [left, right, above, below].some(view => Math.max(...view) < height);
    }

    private scenicScore = (tree: Tree, trees: Tree[][]): number => {
        const { xPos, yPos, height } = tree;
        const left: Tree[] = (trees[yPos]|| []).slice(0, xPos).reverse();
        const right: Tree[] = (trees[yPos]|| []).slice(xPos + 1);
        const above: Tree[] = trees.slice(0, yPos).map(t => t[xPos]!).reverse();
        const below: Tree[] = trees.slice(yPos + 1).map(t => t[xPos]!).filter(Boolean)

        return [left, right, above, below]
            .map(view => Math.max(...view.map(t => t.height)) < height
                ? view.length
                : view.findIndex(tree => tree.height >= height) + 1)
            .reduce((acc, curr) => acc * curr, 1);
    }
}

interface Tree {
    height: number,
    xPos: number,
    yPos: number
}