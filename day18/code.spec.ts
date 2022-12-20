import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day18/input.json", "utf-8"));
};

const testInput: string[] = [
  '2,2,2',
  '1,2,2',
  '3,2,2',
  '2,1,2',
  '2,3,2',
  '2,2,1',
  '2,2,3',
  '2,2,4',
  '2,2,6',
  '1,2,5',
  '3,2,5',
  '2,1,5',
  '2,3,5',
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(64);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(4456);
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(58);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBeLessThan(4126);
    expect(partTwo(loadInput())).toStrictEqual(0);
  });
});
