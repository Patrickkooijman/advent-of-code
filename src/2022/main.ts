import Day from "../shared/Day";
import { Day1 } from './day1';
import { Day2 } from './day2';
import { Day3 } from './day3';
import { Day4 } from './day4';

const days: Array<Day> = [
    new Day1(),
    new Day2(),
    new Day3(),
    new Day4(),
];

await Promise.all(days.map(cl => cl.execute()));


