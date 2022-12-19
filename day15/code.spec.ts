import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day15/input.json", "utf-8"));
};

const testInput: string[] = [
'2,18:-2,15',
'9,16:10,16',
'13,2:15,3',
'12,14:10,16',
'10,20:10,16',
'14,17:10,16',
'8,7:2,10',
'2,0:2,10',
'0,11:2,10',
'20,14:25,17',
'17,20:21,22',
'16,7:15,3',
'14,3:15,3',
'20,1:15,3',
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput, 10)).toBe(26);
  });

  it("should run real input", () => {
    expect(partOne(loadInput(), 2000000)).toBe(4424278);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput, 20)).toBe(56000011);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput(), 4000000)).toStrictEqual(10382630753392);
  });
});
