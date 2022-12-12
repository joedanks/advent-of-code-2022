import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo, Monkey } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day11/input.json", "utf-8"));
};

const testInput: Monkey[] = [
  {
    items: [79n, 98n],
    operation: ["old", "*", "19"],
    test: {
      div: 23n,
      yes: 2,
      no: 3,
    },
    inspected: 0,
  },
  {
    items: [54n, 65n, 75n, 74n],
    operation: ["old", "+", "6"],
    test: {
      div: 19n,
      yes: 2,
      no: 0,
    },
    inspected: 0,
  },
  {
    items: [79n, 60n, 97n],
    operation: ["old", "*", "old"],
    test: {
      div: 13n,
      yes: 1,
      no: 3,
    },
    inspected: 0,
  },
  {
    items: [74n],
    operation: ["old", "+", "3"],
    test: {
      div: 17n,
      yes: 0,
      no: 1,
    },
    inspected: 0,
  },
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(_.cloneDeep(testInput))).toBe(10605);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(54054);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(_.cloneDeep(testInput))).toStrictEqual([52166, 52013]);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toStrictEqual([119677, 119613]);
  });
});
