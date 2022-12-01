import fetch from '../input/fetch'

export const challengeOne = (): Promise<string> => fetch('3').then(challengeOneHandler).then(res => `Day 3, challenge 1: ${res}`);

interface Location {
    x: number;
    y: number;
}

export const  challengeOneHandler = (input: string): number => {
    const startLocation: Location = { x: 0, y: 0 };
    let lastLocation: Location = startLocation;

    return [startLocation].concat(input.split('')
        .map((location: string): Location => {
            switch (location) {
                case '<':
                    lastLocation = { x: lastLocation.x - 1, y: lastLocation.y }
                    return lastLocation;
                case '>':
                    lastLocation = { x: lastLocation.x + 1, y: lastLocation.y }
                    return lastLocation;
                case '^':
                    lastLocation = { x: lastLocation.x, y: lastLocation.y + 1}
                    return lastLocation;
                case 'v':
                    lastLocation = { x: lastLocation.x, y: lastLocation.y - 1 }
                    return lastLocation;
                default:
                    throw new Error("Invalid direction type");
            }
        }))
        .filter(unDoubleLocations)
        .length;
}

export const challengeTwo = (): Promise<string> => fetch("3").then(challengeTwoHandler).then(res => `Day 3, challenge 2: ${res}`);

export const challengeTwoHandler = (input: string): number => {
    const startLocation: Location = { x: 0, y: 0 };
    let santaLastLocation: Location = startLocation;
    let roboSantaLastLocation: Location = startLocation;
    let isSanta: boolean = true;

    return [startLocation].concat(input.split('')
        .map((location: string): Location => {
            switch (true) {
                case location === '<' && isSanta:
                    santaLastLocation = { x: santaLastLocation.x - 1, y: santaLastLocation.y };
                    isSanta = !isSanta;
                    return santaLastLocation;
                case location === '<' && !isSanta:
                    roboSantaLastLocation = { x: roboSantaLastLocation.x - 1, y: roboSantaLastLocation.y };
                    isSanta = !isSanta;
                    return roboSantaLastLocation;
                case location === '>' && isSanta:
                    santaLastLocation = { x: santaLastLocation.x + 1, y: santaLastLocation.y }
                    isSanta = !isSanta;
                    return santaLastLocation;
                case location === '>' && !isSanta:
                    roboSantaLastLocation = { x: roboSantaLastLocation.x + 1, y: roboSantaLastLocation.y };
                    isSanta = !isSanta;
                    return roboSantaLastLocation;
                case location === '^' && isSanta:
                    santaLastLocation = { x: santaLastLocation.x, y: santaLastLocation.y + 1 }
                    isSanta = !isSanta;
                    return santaLastLocation;
                case location === '^' && !isSanta:
                    roboSantaLastLocation = { x: roboSantaLastLocation.x, y: roboSantaLastLocation.y + 1 };
                    isSanta = !isSanta;
                    return roboSantaLastLocation;
                case location === 'v' && isSanta:
                    santaLastLocation = { x: santaLastLocation.x, y: santaLastLocation.y -1 }
                    isSanta = !isSanta;
                    return santaLastLocation;
                case location === 'v' && !isSanta:
                    roboSantaLastLocation = { x: roboSantaLastLocation.x, y: roboSantaLastLocation.y -1 };
                    isSanta = !isSanta;
                    return roboSantaLastLocation;
                default:
                    throw new Error(`Invalid direction type: ${location}`);
            }
        })).filter(unDoubleLocations).length;
}

function unDoubleLocations(loc:Location | undefined, index: number, self: Array<Location | undefined>): boolean {
    return index === self.findIndex((t) => t?.x === loc?.x && t?.y === loc?.y);
}
export default {
    challengeOne,
    challengeTwo,
}
