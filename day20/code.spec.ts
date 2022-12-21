import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day20/input.json", "utf-8"));
};

const testInput: number[] = [1, 2, -3, 3, -2, 0, 4];

const extraTest: number[] = [0, 2, 3, -4];

describe("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(3);
    // expect(partOne(extraTest)).toBe(3);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(4426);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(1623178306);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toStrictEqual(8119137886612);
  });
});
