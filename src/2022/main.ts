import {challengeOne as dayOneChallengeOne, challengeTwo as dayOneChallengeTwo} from './day1';
import {challengeOne as dayTwoChallengeOne, challengeTwo as dayTwoChallengeTwo} from './day2';
// import {challengeOne as dayThreeChallengeOne, challengeTwo as dayThreeChallengeTwo} from './day3';

(await Promise.all([
    dayOneChallengeOne(),
    dayOneChallengeTwo(),
    dayTwoChallengeOne(),
    dayTwoChallengeTwo(),
    // dayThreeChallengeOne(),
    // dayThreeChallengeTwo()
])).map(res => console.log(res));

