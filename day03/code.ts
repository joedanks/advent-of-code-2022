import _ from "lodash";

function createRegex(input: string) {
  return new RegExp(`([${input}])`, 'g');
}

function scoreProblem(problem: string) {
  if (problem === problem.toUpperCase()) {
    return problem.codePointAt(0)! - 38;
  }
  return problem.codePointAt(0)! - 96
}

export function partOne(input: string[]) {
  const problems: string[] = [];
  for (let i = 0; i < input.length; i++) {
    const sack = input[i];
    const compOne = sack.substring(0, sack.length / 2);
    const compTwo = sack.substring(sack.length / 2);

    const match = createRegex(compOne).exec(compTwo);
    if (match) {
      problems.push(match[0])
    }

  }

  console.log(`Found ${problems.length} issues`)

  return problems.map(scoreProblem)
    .reduce((acc, curr) => {
      return acc + curr
    }, 0);
}

export function partTwo(input: string[]) {
  const badges: string[] = [];

  for (let i = 0; i < input.length; i += 3) {
    const sackOne = input[i];
    const sackTwo = input[i + 1];
    const sackThree = input[i + 2];

    const regex = createRegex(sackOne);

    const matches = _.intersection(
      sackTwo.match(regex)!,
      sackThree.match(regex)!
    )

    const badge = matches[0]

    badges.push(badge);
  }

  return badges.map(scoreProblem)
    .reduce((acc, curr) => {
      return acc + curr
    }, 0);
}
