import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day03/input.json", "utf-8"));
};

const testInput = [
  'vJrwpWtwJgWrhcsFMMfFFhFp',
  'jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL',
  'PmmdzqPrVvPwwTWBwg',
  'wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn',
  'ttgJtRGJQctTZtZT',
  'CrZsJsPPZsGzwwsLwLmpwMDw'
];

describe("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(157);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(7674);
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(70);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(2805);
  });
});
