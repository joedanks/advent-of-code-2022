import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day04/input.json", "utf-8"));
};

const testInput = [
'2-4','6-8',
'2-3','4-5',
'5-7','7-9',
'2-8','3-7',
'6-6','4-6',
'2-6','4-8'
];

describe("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(2);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(515);
  });
});

describe.only("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(4);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(883);
  });
});
