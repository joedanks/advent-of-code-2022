import _ from "lodash";

function parseInstruction(input: string): [number, number] {
  const instruction = input.split(" ");
  if (instruction[0] === "noop") {
    return [0, 0];
  }
  return [1, parseInt(instruction[1], 10)];
}

export function partOne(input: string[]) {
  const significantCycles: number[] = [20, 60, 100, 140, 180, 220];
  const signals: number[] = [];
  let instruction: [number, number] | undefined;
  let registerX = 1;
  let cycle = 1;
  let instructionIndex = 0;

  while (cycle <= 220) {
    if (!instruction) {
      const nextInstruction = parseInstruction(input[instructionIndex]);
      instruction = [cycle + nextInstruction[0], nextInstruction[1]];
    }
    //mid execution
    if (significantCycles.includes(cycle)) {
      signals.push(cycle * registerX);
    }

    //end
    if (instruction[0] === cycle) {
      registerX += instruction[1];
      instruction = undefined;
      instructionIndex++;
    }
    cycle++;
  }

  return _.sum(signals);
}

function printCRT(pixels: string[]) {
  const crt = _.chunk(pixels, 40)
    .map((line) => line.join(""))
    .join("\n");

  console.log(crt);
}

export function partTwo(input: string[]) {
  const pixels: string[] = [];
  let instruction: [number, number] | undefined;
  let registerX = 1;
  let cycle = 1;
  let instructionIndex = 0;

  while (cycle <= 240) {
    if (!instruction) {
      const nextInstruction = parseInstruction(input[instructionIndex]);
      instruction = [cycle + nextInstruction[0], nextInstruction[1]];
    }
    //mid execution
    if (
      (cycle - 1) % 40 === registerX - 1 ||
      (cycle - 1) % 40 === registerX ||
      (cycle - 1) % 40 === registerX + 1
    ) {
      pixels.push("#");
    } else {
      pixels.push(".");
    }

    //end
    if (instruction[0] === cycle) {
      registerX += instruction[1];
      instruction = undefined;
      instructionIndex++;
    }
    cycle++;
  }

  printCRT(pixels);
  return pixels.join("");
}
