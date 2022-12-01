import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day01/input.json", "utf-8"));
};

const testInput = [
  1000,
  2000,
  3000,
  null,
  4000,
  null,
  5000,
  6000,
  null,
  7000,
  8000,
  9000,
  null,
  10000,
];

describe("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(24000);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(69289);
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(45000);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(205615);
  });
});
