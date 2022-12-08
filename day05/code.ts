import _ from "lodash";

type Yard = Record<number, string[]>;

function getInstruction(input: string) {
  return input.split("-").map((x) => Number.parseInt(x, 10));
}

export function partOne(start: Yard, input: string[]) {
  const finalYard = input.reduce((previousYard, instruction) => {
    const order = getInstruction(instruction);

    for (let i = 0; i < order[0]; i++) {
      const crate = previousYard[order[1]].pop()!;
      previousYard[order[2]].push(crate);
    }
    return previousYard;
  }, start);

  const tops = Object.entries(finalYard)
    .map(([key, value]) => [key, value.pop()!])
    .sort((a, b) => Number.parseInt(a[0], 10) - Number.parseInt(b[0], 10))
    .map(([key, value]) => value);
  return tops.join("");
}

export function partTwo(start: Yard, input: string[]) {
  const finalYard = input.reduce((previousYard, instruction) => {
    const [moving, from, to] = getInstruction(instruction);

    const movingCrates = previousYard[from].slice(0 - moving);
    const remainingCreates = previousYard[from].slice(0, 0 - moving);

    previousYard[from] = remainingCreates;
    previousYard[to].push(...movingCrates);

    return previousYard;
  }, start);

  const tops = Object.entries(finalYard)
    .map(([key, value]) => [key, value.pop()!])
    .sort((a, b) => Number.parseInt(a[0], 10) - Number.parseInt(b[0], 10))
    .map(([key, value]) => value);
  return tops.join("");
}
