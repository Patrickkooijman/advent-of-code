import fetch from '../input/fetch';

const day: number = 5;

export const challengeOne = (): Promise<string> =>
  fetch(day)
    .then(challengeOneHandler)
    .then(res => `Day ${day}, challenge 1: ${res}`);
export const challengeOneHandler = (input: string): number => abstractHandler(input, isNiceString);
export const isNiceString = (value: string): boolean =>
  createPipe(hasThreeVowels, hasTwoConsecutiveLetters, doesNotContainBlacklisted)(value);

export const challengeTwo = (): Promise<string> =>
  fetch(day)
    .then(challengeTwoHandler)
    .then(res => `Day ${day}, challenge 2: ${res}`);
export const challengeTwoHandler = (input: string): number =>
  abstractHandler(input, isNiceAdvancedString);
export const isNiceAdvancedString = (value: string): boolean =>
  createPipe(doesRepeat, isSpaced)(value);

const abstractHandler = (input: string, withMethod: Predicate): number =>
  input.split('\n').filter(Boolean).filter(withMethod).length;
const createPipe =
  (...fns: Function[]): Function =>
  (input: string): boolean =>
    fns.reduce((a: boolean, f: Function) => a && f(input), true);

const hasThreeVowels = (input: string): boolean => (input.match(/[aeiou]/gi) || []).length >= 3;
const hasTwoConsecutiveLetters = (input: string): boolean =>
  !!(input.match(/([a-z])\1/) || []).length;
const doesNotContainBlacklisted = (input: string): boolean =>
  !(input.match(/ab|cd|pq|xy/) || []).length;

const doesRepeat = (input: string): boolean => !!(input.match(/(..).*\1/) || []).length;
const isSpaced = (input: string): boolean => !!(input.match(/(.).\1/) || []).length;

type Predicate = {
  (value: string): boolean;
};

export default {
  challengeOne,
  challengeTwo,
};
