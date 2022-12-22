import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day21/input.json", "utf-8"));
};

const testInput: string[] = [
  'root:pppw+sjmn',
  'dbpl:5',
  'cczh:sllz+lgvd',
  'zczc:2',
  'ptdq:humn-dvpt',
  'dvpt:3',
  'lfqf:4',
  'humn:5',
  'ljgn:2',
  'sjmn:drzm*dbpl',
  'sllz:4',
  'pppw:cczh/lfqf',
  'lgvd:ljgn*ptdq',
  'drzm:hmdt-zczc',
  'hmdt:32',
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(152);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(110181395003396);
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(301);
  });

  it.only("should run real input", () => {
    expect(partTwo(loadInput())).toStrictEqual(0);
  });
});
