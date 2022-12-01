import _ from "lodash";

function parseInput(input: (number | null)[]) {
  let currentElf: number = 0;
  let elfTotals: number[] = [];

  for (let i = 0; i < input.length; i++) {
    let value = input[i];
    if (value === null) {
      elfTotals.push(currentElf);
      currentElf = 0;
    } else {
      currentElf += value;
    }
  }
  elfTotals.push(currentElf);

  return elfTotals;
}

export function partOne(input: (number | null)[]) {
  const elfTotals = parseInput(input);

  return _.max(elfTotals);
}

export function partTwo(input: (number | null)[]) {
    const elfTotals = parseInput(input);

    const sortedTotals = elfTotals.sort((a, b) => b - a);

    return sortedTotals[0] + sortedTotals[1] + sortedTotals[2];
}
