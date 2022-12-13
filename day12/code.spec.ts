import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day12/input.json", "utf-8"));
};

const testInput: string[] = [
  'Sabqponm',
  'abcryxxl',
  'accszExk',
  'acctuvwj',
  'abdefghi'
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(31);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(534);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toStrictEqual(29);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toStrictEqual(525);
  });
});
