import Day from '../../shared/Day.ts';
import { Day1 } from './day1';
import Day10 from './day10';
import Day11 from './day11';
import Day12 from './day12';
import Day13 from './day13';
import Day14 from './day14';
import Day15 from './day15';
import Day16 from './day16';
import { Day2 } from './day2';
import { Day3 } from './day3';
import { Day4 } from './day4';
import { Day5 } from './day5';
import { Day6 } from './day6';
import Day7 from './day7';
import Day8 from './day8';
import Day9 from './day9';

const days: Day[] = [
  new Day1(),
  new Day2(),
  new Day3(),
  new Day4(),
  new Day5(),
  new Day6(),
  new Day7(),
  new Day8(),
  new Day9(),
  new Day10(),
  new Day11(),
  new Day12(),
  new Day13(),
  new Day14(),
  new Day15(2_000_000, 4_000_000),
  new Day16(),
];

const execute = async (days: Day[]) => {
  await Promise.all(days.map(cl => cl.execute())).then(results =>
    results.map(result => {
      console.log(result);
    })
  );
};

const [day] = process.argv.slice(2);

if (day) {
  const challenge: Day | undefined = days[Number(day) - 1];
  await execute([challenge!]);
} else {
  await execute(days);
}
