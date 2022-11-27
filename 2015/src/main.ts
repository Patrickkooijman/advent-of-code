import { challengeOne as dayOneChallengeOne, challengeTwo as dayOneChallengeTwo} from './day1';
import { challengeOne as dayTwoChallengeOne, challengeTwo as dayTwoChallengeTwo} from './day2';

   (await Promise.all([
        dayOneChallengeOne(),
        dayOneChallengeTwo(),
       dayTwoChallengeOne(),
       dayTwoChallengeTwo()
    ])).map(res => console.log(res));

