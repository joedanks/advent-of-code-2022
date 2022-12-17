import * as fs from "fs";
import _ from "lodash";
import { partOne,partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day16/input.json","utf-8"));
};

const testInput: string[] = [
'AA=0;DD,II,BB',
'BB=13;CC,AA',
'CC=2;DD,BB',
'DD=20;CC,AA,EE',
'EE=3;FF,DD',
'FF=0;EE,GG',
'GG=0;FF,HH',
'HH=22;GG',
'II=0;AA,JJ',
'JJ=21;II'
];

describe.skip("Part 1",() => {
  it("should pass test input",() => {
    expect(partOne(testInput)).toBe(1651);
  });

  it("should run real input",() => {
    expect(partOne(loadInput())).toBe(1828);
  });
});

describe("Part 2",() => {
  it("should pass test input",() => {
    expect(partTwo(testInput)).toBe(1707);
  });

  it.only("should run real input",() => {
    expect(partTwo(loadInput())).toStrictEqual(32041);
  });
});
