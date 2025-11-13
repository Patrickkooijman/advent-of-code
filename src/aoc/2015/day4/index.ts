import crypto from 'crypto';
import fetch from '../input/fetch.ts';

export const challengeOne = (): Promise<string> =>
  fetch('4')
    .then(challengeOneHandler)
    .then(res => `Day 4, challenge 1: ${res}`);

export const challengeOneHandler = (input: string): number =>
  calculateHash(input, /^0{5,}[:alnum:]*/);

export const challengeTwo = (): Promise<string> =>
  fetch('4')
    .then(challengeTwoHandler)
    .then(res => `Day 4, challenge 2: ${res}`);

export const challengeTwoHandler = (input: string): number =>
  calculateHash(input, /^0{6}[:alnum:]*/);

function calculateHash(fromString: string, withRegex: RegExp): number {
  let n = 0;
  const input: string = fromString.replace(/(\r\n|\n|\r)/gm, '');

  while (
    !new RegExp(withRegex).test(crypto.createHash('md5').update(`${input}${n}`).digest('hex')) &&
    n < 2_000_000
  ) {
    n++;
  }

  return n;
}

export default {
  challengeOne,
  challengeTwo,
};
