import { challengeOne, challengeTwo } from './day1';

   (await Promise.all([
        challengeOne(),
        challengeTwo()
    ])).map(res => console.log(res));

