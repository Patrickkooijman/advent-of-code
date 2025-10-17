import Day from '../../shared/Day';

export class Day4 extends Day {
  day = 4;
  year = 2022;

  challengeOneHandler = (input: string): number =>
    this.abstractHandler(Day4.doesAssignmentOverlap)(input);

  challengeTwoHandler = (input: string): number =>
    this.abstractHandler(Day4.doesAssignmentPartiallyOverlap)(input);

  private abstractHandler =
    (withMethod: Predicate): Function =>
    (input: string) =>
      input
        .split('\n')
        .filter(Boolean)
        .map((line: string): Assignment => {
          const [_, s1 = '', e1 = '', s2 = '', e2 = ''] =
            /(\d*)-(\d*),(\d*)-(\d*)/.exec(line) || [];

          return {
            s1: parseInt(s1),
            s2: parseInt(s2),
            e1: parseInt(e1),
            e2: parseInt(e2),
          };
        })
        .filter(withMethod).length;

  private static doesAssignmentOverlap = (assignment: Assignment): boolean => {
    return (
      (assignment.s1 >= assignment.s2 &&
        assignment.s1 <= assignment.e2 &&
        assignment.e1 >= assignment.s1 &&
        assignment.e1 <= assignment.e2) ||
      (assignment.s2 >= assignment.s1 &&
        assignment.s2 <= assignment.e1 &&
        assignment.e2 >= assignment.s2 &&
        assignment.e2 <= assignment.e1)
    );
  };

  private static doesAssignmentPartiallyOverlap = (assignment: Assignment): boolean => {
    return (
      (assignment.e1 >= assignment.s2 && assignment.e1 <= assignment.e2) ||
      (assignment.e2 >= assignment.s1 && assignment.e2 <= assignment.e1)
    );
  };
}

interface Assignment {
  s1: number;
  s2: number;
  e1: number;
  e2: number;
}

type Predicate = (value: Assignment) => boolean;
