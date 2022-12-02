// import {challengeOne as dayOneChallengeOne, challengeTwo as dayOneChallengeTwo} from './day1';
// import {challengeOne as dayTwoChallengeOne, challengeTwo as dayTwoChallengeTwo} from './day2';
// import {challengeOne as dayThreeChallengeOne, challengeTwo as dayThreeChallengeTwo} from './day3';
// import {challengeOne as dayFourChallengeOne, challengeTwo as dayFourChallengeTwo} from './day4';
import {challengeOne as dayFiveChallengeOne, challengeTwo as dayFiveChallengeTwo} from './day5';

(await Promise.all([
    // dayOneChallengeOne(),
    // dayOneChallengeTwo(),
    // dayTwoChallengeOne(),
    // dayTwoChallengeTwo(),
    // dayThreeChallengeOne(),
    // dayThreeChallengeTwo(),
    // dayFourChallengeOne(),
    // dayFourChallengeTwo(),
    dayFiveChallengeOne(),
    dayFiveChallengeTwo()
])).map(res => console.log(res));

