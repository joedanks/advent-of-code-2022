import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day09/input.json", "utf-8"));
};

const testInput = [
'R 4',
'U 4',
'L 3',
'D 1',
'R 4',
'D 1',
'L 5',
'R 2',
];

const bigTestInput = [
'R 5',
'U 8',
'L 8',
'D 3',
'R 17',
'D 10',
'L 25',
'U 20',
]

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(13);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(6376);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(1);
  });
  
  it("should pass big test input", () => {
    expect(partTwo(bigTestInput)).toBe(36);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(2607);
  });
});
