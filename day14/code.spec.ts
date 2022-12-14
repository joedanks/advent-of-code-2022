import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day14/input.json", "utf-8"));
};

const testInput: string[] = [
'498,4 -> 498,6 -> 496,6',
'503,4 -> 502,4 -> 502,9 -> 494,9'
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(24);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(964);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(93);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toStrictEqual(32041);
  });
});
