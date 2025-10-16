import Day from '../../shared/Day';

export default class Day7 extends Day {
  day: number = 7;
  year: number = 2022;
  root: Folder = {
    name: '/',
    parent: null,
    children: [],
    files: [],
    size: 0,
  };

  challengeOneHandler = (input: string): number => {
    this.parseInput(input);

    return this.getSumOfFoldersBelow(this.root);
  };
  challengeTwoHandler = (input: string): number => {
    this.parseInput(input);

    return this.findSmallestFolder(this.root).size;
  };
  parseInput = (input: string): void => {
    let activeDir: Folder = this.root;

    input
      .split('\n')
      .filter(Boolean)
      .forEach((command: string): void => {
        switch (true) {
          case /\$\scd\s\//.test(command):
            activeDir = this.root;
            break;
          case /\$\scd\s[a-z]+/.test(command):
            const newDirName = command.split(' ').pop();
            const newDir = activeDir.children.find(f => f.name === newDirName);
            if (!newDir) throw Error;
            activeDir = newDir;
            break;
          case /\$\scd\s\.{2}/.test(command):
            const { parent } = activeDir;
            if (!parent) throw Error;
            activeDir = parent;
            break;
          case /\$\sls/.test(command):
            break;
          case /^dir\s.*/.test(command):
            const dirName: string = command.split(' ').pop() || '';
            if (!activeDir.children.some(c => c.name === dirName)) {
              activeDir.children.push({
                name: dirName,
                parent: activeDir,
                children: [],
                files: [],
                size: 0,
              });
            }
            break;
          case /^[0-9]*\s.*/.test(command):
            const [size, fileName = ''] = command.split(' ');
            if (!activeDir.files.some(f => f.name === fileName)) {
              activeDir.files.push({
                name: fileName,
                size: parseInt(size || '0'),
              });
            }
            break;
          default:
            break;
        }
      });

    this.calculateSize(this.root);
  };

  private calculateSize = (root: Folder): number => {
    let children: number = 0;
    if (root.children.length) {
      children = root.children.map(this.calculateSize).reduce((acc, cur) => acc + cur, 0);
    }
    root.size = children + root.files.reduce((acc: number, cur: File): number => acc + cur.size, 0);

    return root.size;
  };

  private getSumOfFoldersBelow = (root: Folder): number => {
    const threshold: number = 100_000;
    const thisSize = root.size <= threshold ? root.size : 0;
    const childrenSize = root.children
      .map(f => this.getSumOfFoldersBelow(f))
      .reduce((acc, cur) => acc + cur, 0);

    return thisSize + childrenSize;
  };

  private findSmallestFolder = (root: Folder): Folder => {
    const diskSpace: number = 70_000_000;
    const diskSpaceNeeded: number = 30_000_000;
    const needed: number = Math.abs(diskSpace - diskSpaceNeeded - this.root.size);

    return root.size > needed && !!root.children.length
      ? root.children.reduce((acc, curr) => {
          const smallestFolder = this.findSmallestFolder(curr);
          return smallestFolder.size < acc.size && smallestFolder.size >= needed
            ? smallestFolder
            : acc;
        }, root)
      : root;
  };
}

interface File {
  name: string;
  size: number;
}

interface Folder {
  name: string;
  parent: Folder | null;
  children: Array<Folder>;
  files: Array<File>;
  size: number;
}
