import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day13/input.json", "utf-8"));
};

const testInput: string[] = [
'[1,1,3,1,1]',
'[1,1,5,1,1]',
'[[1],[2,3,4]]',
'[[1],4]',
'[9]',
'[[8,7,6]]',
'[[4,4],4,4]',
'[[4,4],4,4,4]',
'[7,7,7,7]',
'[7,7,7]',
'[]',
'[3]',
'[[[]]]',
'[[]]',
'[1,[2,[3,[4,[5,6,7]]]],8,9]',
'[1,[2,[3,[4,[5,6,0]]]],8,9]',
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(13);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(6272);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toStrictEqual(140);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toStrictEqual(525);
  });
});
