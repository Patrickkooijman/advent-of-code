import Day from '../../shared/Day';

export default class Day16 extends Day {
    day: number = 16;
    year: number = 2022;
    challengeOneHandler = (input: string): number => {
        const valves: Map<string, Valve> = this.parseInput(input);

        let pressure: number = 0;
        let totalPressure: number = 0;
        let minutesSpent: number = 0;
        let currentValve: Valve = valves.get('AA')!;

        while (minutesSpent < 30) {
            if (currentValve.opened || !currentValve.rate) {
                currentValve = currentValve.leads.reduce((acc, curr): Valve => !acc ? curr : curr.rate > acc.rate ? curr : acc);
            }

            totalPressure += pressure;
            minutesSpent++;
        }

        return totalPressure;
    }
    challengeTwoHandler = (input: string): number => {
        return input ? 0 : 0;
    };

    private getOrAddValve = (name: string, valves: Map<string, Valve>): Valve => {
        if (valves.has(name)) {
            return valves.get(name)!;
        }

        const valve = {
            name,
            rate: 0,
            opened: false,
            leads: []
        };

        valves.set(name, valve)
        return valve;
    }

    private parseInput = (input: string): Map<string, Valve> => {
        const valves: Map<string, Valve> = new Map();

        input.split('\n')
            .forEach((line: string): void => {
                const [_, name = "", rate = "", leads = "" ] = line.match(/Valve\s([A-Z]{2}).*=(\d+).*valves\s(.*)/)!;
                const valve = this.getOrAddValve(name, valves);
                valve.rate = Number(rate);
                valve.leads = leads.split(',').map(s => s.trim()).map(n => this.getOrAddValve(n, valves));
            });

        return valves;
    }
}

interface Valve {
    name: string;
    opened: boolean;
    rate: number;
    leads: Valve[],
}