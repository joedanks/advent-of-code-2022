import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day05/input.json", "utf-8"));
};

const start = {
  1: ['Z', 'N'],
  2: ['M', 'C', 'D'],
  3: ['P'],
}

const realStart = {
  1: ['N', 'B', 'D', 'T', 'V', 'G', 'Z', 'J'],
  2: ['S', 'R', 'M', 'D', 'W', 'P', 'F'],
  3: ['V', 'C', 'R', 'S', 'Z'],
  4: ['R', 'T', 'J', 'Z', 'P', 'H', 'G'],
  5: ['T', 'C', 'J', 'N', 'D', 'Z', 'Q', 'F'],
  6: ['N', 'V', 'P', 'W', 'G', 'S', 'F', 'M'],
  7: ['G', 'C', 'V', 'B', 'P', 'Q'],
  8: ['Z', 'B', 'P', 'N'],
  9: ['W', 'P', 'J']
}

const testInput = [
  '1-2-1',
  '3-1-3',
  '2-2-1',
  '1-1-2',
];

describe("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(start, testInput)).toBe('CMZ');
  });

  it("should run real input", () => {
    expect(partOne(realStart, loadInput())).toBe("GFTNRBZPF");
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(start, testInput)).toBe("MCD");
  });

  it("should run real input", () => {
    expect(partTwo(realStart, loadInput())).toBe("VRQWPDSGP");
  });
});
