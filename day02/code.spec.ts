import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day02/input.json", "utf-8"));
};

const testInput = [
  'A', 'Y',
  'B', 'X',
  'C', 'Z'
];

describe("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(15);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(10404);
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(12);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(10334);
  });
});
