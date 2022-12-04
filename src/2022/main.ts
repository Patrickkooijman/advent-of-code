import {challengeOne as dayOneChallengeOne, challengeTwo as dayOneChallengeTwo} from './day1';
import {challengeOne as dayTwoChallengeOne, challengeTwo as dayTwoChallengeTwo} from './day2';
import { Day3 } from "./day3";
import { Day4 } from "./day4";
import Day from "../shared/Day";

(await Promise.all([
    dayOneChallengeOne(),
    dayOneChallengeTwo(),
    dayTwoChallengeOne(),
    dayTwoChallengeTwo(),
])).map(res => console.log(res));

const days: Array<Day> = [
    new Day3(),
    new Day4(),
];

await Promise.all(days.map(cl => cl.execute()));


