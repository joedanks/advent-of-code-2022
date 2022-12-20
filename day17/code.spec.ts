import * as fs from "fs";
import _ from "lodash";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day19/input.json", "utf-8"));
};

const testInput: string = '>>><<><>><<<>><>>><<<>>><<<><<<>><>><<>>';
const realInput: string = '><<<<>><<<>><>>><<<>>>><<<<>>>><<>>><>>><>><<<>>><<<>>>><>><>>>><<<>><<<<>><<<><<<<>>><<>>><<><<<>>>><<<><>><<>><<<<>>><>>><<<>>>><<<<>>>><><>>><>>><<<<>>>><<<<>>><<<<><<<>>>><<><<<>>>><<<<>>><>>>><<<>>>><>>><<>>><<<>><<<<>><<>>><<<><<>>><<>>>><<>>><>>><<<>>><<<>>>><<>>><<<>><<<<>>><>>>><<><>>>><>>>><>>>><<>><<<>>>><<<>>><<>>>><<<<>>>><<<><>>>><<<>>><<<<>>><<>>>><<<<>><<<>>>><<><<><<>><<<<>>>><<>>>><<<<>><<<<>>><<>>>><<>>><<<>>>><<<<>><>><<<<>><<<<><<<<>>><<>>><<<<><<<<>>>><>>><<<<>><<>>>><<<><>><<<<>>>><><<<><<<<>>>><<<>>><<<><><<<>>><>>><>>>><<<>>><<><><<>>><<<<><>>><>><>><<>>>><<<<>><<<>><<<>>><<>>><>>>><><<>>><<<<><>><>>>><>>>><>><>><<>>><>>><>>><<<<>><<<<><<<>><<><>><>><<<<>>>><<>><<<>>>><<><<<><<<<>><<<>><<>><>>>><<>>>><<>>>><<>>><<<><<<>><<<>>><<<<>>><>><<>><<<><><<<<><>>><<<<><<<>>><<<>>>><<<><<<>><<<<>>>><<>>><<><><<<<><>><<<><<<<>>><<<<>>>><<><<><<<<>>>><<<>>>><<<<>><<<<>><<<<>>><<<<>>><<>>>><<>>>><<<>>><<>>>><<<><<>>>><><<>>>><>>>><<>><>>>><<<>><<<<>>>><<<>><>>>><<<>><<>>><<<>>>><>>><>>>><<<>><<<>>>><<<<><<<<><<<<>>>><<>><<<><<>>>><<<>>><>>>><><<<><<>><<<><<<>>><>><<<><<<>><>><<<<><<<<><>><<<>>><<<>>><>>><<<<><>>><<<>><<<<>>><><<<>>>><<<><>><<<><<<<>><<<<>>>><><<<<>>><<<<>>>><<<<>><>><<><<<<><<>>><<>>>><<<><<>>>><>><<<><<>><>><<<<>><><<>>>><<>><><<>>><<<>><<><<<>><<><<><>>>><<<<>>><>>><<<>>>><<><<<>>><<<<><<<<>>>><<><>><><<>>><>><><<<>><>>>><>><<<<><<>>><<<<>>><<<>><<<<>>><>>><<<<>>><>>><<<<><<<<>><<<<><<<><<<>>>><<<>>>><<<>>>><<<<>><>><<<<>>><<<<>><<<>><<<>><>>>><<><>>><<<>>>><>><><><>>><<>>><<<>><>><<>>>><<<<>>><<<<>><<><<<<>><>><>>><<<><<>>><<><<><<>>><<>>><<<<>>><<><<<>>>><>>><>>>><<<<><<<>>><<>>><>><<>>>><<<>><<<<>><<<<>><<<>><<<<><<<>><<>>><<<<>>>><<><<<>><><<<<>>><<<<>>>><<<>><<>>><>><<<<>>>><>>><<><<<<>>>><>><<<>>>><<>>>><<<>>><><<<>>>><>>><<><<<><>>><<><<<<>><<>>>><<<<>>><<<<><<<>>>><<<<><<<<>><<<<>><>>>><<><>><<<>>><>><<>><<<<>>><<<>><<><<<<>><<<>>>><<>>>><<<<><><<<<>>>><<>>><<<>>><<<>><<>><<<><>>>><<><<<>><<<>>>><>>><<>><<<><><><<<>>>><>>>><<<<>>><<<><<<<>>><<>>><<<>><<<><<<<>>><<<<>><<<<><<>>>><>><<<<>><<<>>>><<<<>>><<<>><<>><<<>>>><>><>>><>>>><<>>>><<<>><<<<>>>><<<>><<<>>>><<<<>><<<>>><>>><>>><<>><>>><<<<>>>><<><><<><<<<>><>>><>>>><<<>>><<>><><>><><<<<>>>><<<>>>><>>>><>>>><<<<>><<<>><<>><<>>>><<<><>>><<>>><<>>><<<>>><<<<><<>><<><<>><>>>><<<<>>>><>><<>><>>><<<>>><>>>><<>>>><>>>><<<><<<>>>><<<<>><<>>><>><<>>><<<>>>><<<<><>>>><<<<>><<><><<<<>>><>>><<<>><><>><>>><<>>>><<<<><<<>>>><<<>><<>>><<<>><<<>><<<<><><>>>><<>>>><<>>><<<>><<<<><<<><<>>>><>>><<<>><<<<>><>>>><<<<>>>><<<<>>>><>>>><>>>><<<>>><>>><<>><<<>><>><<<<>><<<<>><<<><><<><<<<>><>>><>>><<<>>>><><><<>>>><<<>>><<<<>>><>>>><<<>>><<<><<<>>>><<>>><<<>>>><>>>><<><<><<<<>><<<><<<<>><<<>>>><<><<<<>>><<<<>><<>>>><<<<>><>>>><>><<<>>>><<<<><<<<><><<<><<><<<<><<<><<<<>>>><<<<>>>><<>>><<<<><<><<<<>>><<<<>>><>>>><>><>>><><<<>>><>>>><>><<<>><<<<>>><<>><<><<<>>>><<><<><<><<>><<<>>><<<>>><>>>><>><>><<<<>>>><<>>><<<<>>><<>><<<<><<>>>><>>>><<<<>>>><<<<>><>>><<>>>><<<><<<<>><<<<><<>>>><><<>>><<<<>>>><<>>><<><<>><>>><>>>><<>><<<><<<<><<<<>><<<>><<>>>><>><<<<><<<>><<><<<<><<<>><>>>><<>>><<<<><>>><<<<>>>><<<>><>>>><>><<<<>><>><<<<>>>><>>><><>>><<><>><<<>>>><<<>>><<<<><<<<>><>><<>>>><<<<>><>><<<>><<<<>>>><<>>><<<><<<><<<<>><<<<><<>>>><<<<>>>><<<<>>>><<<>><<<<>><>>><<>>><<<<>>><>>>><<<<><<>><<<>>>><><<<<><<<>>><<<<><<<<>><<<>><<<<>>><<<<>>><<><<><<<>>>><><<<>>>><<>>><<<<>>>><<<<>>>><>>>><<<<>>>><>>><<<>><<<<>>><<><><<<<>>>><<<>>>><>>>><<>>><<<<>>><<<<>><<><<<>><>>>><>>><>><>>><<>>>><<>>><<<<><<<>><<>>><>>>><<<><>><<>>>><>>><<>>><<<>>><<><<<<>>><<>><<<<><<>>><<<><<<>>><<>>><<<<>><><<<>>>><<<<>>><><<>><<<><<<<>><><<<<>><<<>><>><><<<>>><<<<>>><>>><<>><<<>><>><<>><<<><<<>><<>>>><<>>><<><<>>>><<>>>><><>>><<><<<<>><><><<<>><<<>>>><<<>><>>><>>>><><<<>><><>>><>>><<>>><><<<<>>>><<><<<<>>>><<>>>><<<<>>>><<><<<<>>><<<>>><<>>>><<<>>><<<<>><<><<<<><>>>><<<<><<>><>>>><>>><<<<>><<<>>>><<<<>>><<><<<<>>><<<>>><>>><<<<>>><<<<>><>>><<<<>>><>><<<>>><<<<>><<<<>><<<<><>>><>>>><<>>>><<>><<>>>><><<>>><<<>><>><>>><<<<>>><<<>>>><<<>>>><<>>><<<<>>><>>>><<<<>><<>>><><<<>>><>><>><<>><><<<<>>>><<><<>><<<>>>><<<>><>><<><<<<>><<<>><<<>><<<>>>><<<>>><<<<><<><<<<>>>><<<><<>>>><<<><<<>>><<<>>><<<>>><>>>><<<<>>><<<>><<<<>>>><<<><>>>><<><<<<>>>><<<>>><<<>>>><<<<>>><<<<><><<>>>><>><<<<>>>><<><<<<>>>><<<<>>><<<<><>>>><>><>>><<<>>><<<<>><>><>><>>><<>><>>><<>>><><<<<><<<><<>>><<><>>><<><<>>>><>>><<>>>><<<>>><<<>>>><<>>>><<>>>><<>>>><<<<>><<<<><><<<><>>>><<<><>><<<>>><<<<><<><<>>><<>>><<>><<<<>>>><<>>><<>>><<<>>>><<<>>><<<>>>><<<>>><<<<>>>><><<<><<<>><<>>>><<>>><<<<><<<>>>><<>>><<>>><<<>><<>>><<><>>><<<<>>>><<<>>><<<><<<<>>>><<<>>><<><>>><<><<<>><<>>><<<<>><>>>><>>><<<>>><<<>>>><<<<>>><<<>>><>>><>>><<<><<<>><<<><<<<>>><<>>><>>>><<<><<<<>>><<>>><>><<<>>><<><<><<>><<<<>><<<>>><<><<<<><<<<>><<<<>>>><><<<><>>><<>><<<<>>><>><>>>><<><<><<<>><<>><<>>>><<<<><<<>>>><<<>>>><<<>>>><<<><<<<>>>><<<>><<<<><<<>><>>>><>>><<><>>>><>>><<<<>>><<<<>>><<<>><<>>>><<<>>><><>><>><<>><>>>><>>>><>>>><>><<>>>><<<>><<><>><<<<>>><<<>>><<<<>><<<<><<<<>><>>><<<><><<<><<><<>>><<><<><<<>>>><<<>>><<<<>>><><<<>><<<>>>><<<>><>><<<>>><<<<>><>>><<<>><>><<<<>>>><<><>>>><<<><<><<>><>>>><<<<>>>><><<>>>><<>><<>>><><<<>>>><<<>>><<<>>><>><><<<<>><<<<>>><<<<>><<<<><<<>>>><<>>>><<>><<>>>><<><>>>><<>><<<<>>><<<>><>>><<<<>>>><<>><<<<><<<<>>>><<>>><<<>>><<<<>>>><><<<<>><<<><<<<><>>>><<><<><<>><>>>><><>>><<<>>><<<>>>><<>>><<<<>><<<<>>>><<<><<<>><<>>>><>><<><<<>><<<<><>><<>><<<>><<><<<<>>>><<>>>><<<>>>><<<>><<<<><<<<>>>><>>><>>><<<>>><<>><>>><<<>>>><<<>><>>>><><>><<<>><<><<<>><<<>>><<<<>>><<>>><<>>><<<<>><>>><<>>><>>><<<>>><<<<><<>>>><<<<>>><<<<>><<<>>><<>>>><>>><<<<><>>><<<>><<><<><<><><<<>>><<<>>>><<><>><<<>><<<<>><<>>><>>><<<<>><<<><<<<>><>>><>>>><<<<><<<<>>>><<<<>>>><<><<>>>><<<<>><>><<>>><>>>><<>><>><<<>><<<>>><<<<>><>>><<<<>>>><<<>>>><<<<><><<<<><<>>><<<<>>>><<<<>><<<<><<<<><>><><<>><<<>><<<<>>>><<<<>>><<<>>>><<<>><<<>>><>>><<<<>><<<<><<<>><<<<>>>><<<>><<<<><<>><<<>>>><<<<><<<<>>><>>><<<>>><<<>>>><>><>>><<><<><<<<><<>>>><<>>>><<<>>>><<<>>><<<>><<<><<<><><<<>>>><<<<><>><<<>>><>>>><<<>>>><>>>><<>><<><<>>>><<<<>>>><<<<><<><>>><<<<>><<>>><<>><<<>><>><<>>><<<>>>><<<<>><<<>><<<<><<<>><<<<>>>><<<>>>><<<>><><<<>>>><<<>><<<<><><>>><>>><<>><<<>>>><>>>><>>><<<<>>><<<<>>>><<<>><>>>><<>><>>>><<<>>>><<>>>><<<<>>>><<<>><<<<><<<<>>>><<<>>><><<<>>>><>>><<<<>><<<<>>><><<<<>><<<>>><<<<>>><<<><<<<>>><<<>>>><<<><<<><><<<<>>><<<<>>><<<>><<<<>><><<<>>><>>><<<>>><<<>>>><>>>><<<><<>>><<>>><>>>><<<>><>><><<<<>>><<<>>>><<>>><<><>>>><<<>><<<><<><<<>>>><>>>><<<<>><<<<>><<<>>>><<<><<<><>>>><<<<>><<><<>>><<<<>>><>>><<<><><<<<>><>><>>><<<>>>><<<><><<<<><<<<>>><<><<<<>><<>>>><<><>>>><<<>>><<<>>>><<<>>><><<<<><<>>><<><<<><<<<>>><<>>>><>><<<>>>><<>>>><<><<<>>><<>>>><>><<<>>>><<<<>>>><>>><<><><<><><>><<>><>><>><<>>>><<>><<<<><<<<>>>><><<>><>>>><<><<><<>>><<<><<<>>>><<<>>>><<<<>>><<<>>><<<<>><<<>>>><<<><>>><><<<<><<<<>>>><<>>>><>>>><<>>>><>>><<>><<<<><<<<>>>><<<<><>>>><<<>><<>>><<<<><<>><<>><><<<>>><<<>>>><<<>>><>>><><<<<>>>><<>>>><>>>><><<<<>>>><<>>>><<>><>>>><<<<><<<>>>><<>><<<<>>>><<<><<<><<<>>><<>>><>><<>>><>><<<>>><<<<>><<>><<<>>>><<<>>>><<><<>>>><<>><<<<>><<<>>>><<>>>><<<>>><<><<>>>><<>>><>>>><<<><<<>><>><<<<>>><<>><>><<>><>>>><><<<>><<><<>>><<>><<<><<><<><<<><><<>>>><<<><<<>>><>>>><<<>>>><<<<>>><<<><>>><>>>><<>><<<<>><>><<<>><<>><<<><><<>>>><<<<>>><<<>>><<<<>><<>><<<>><>><<<>>><<<>>><<<<>>>><<>>>><<<<>>><<<>><<<<><><<<<>>>><>>>><<<<>><<<<><<<<>><>>>><<<><>><<<>>><<<<><<<<>>><<<<><<>>>><<><>><<<>>>><<<<>>>><>>><<<>><<<<>>><>>><>><<<>>><<<>>>><>>>><<<<>><<>><<<>>><<<<>>><<<<><<<>>><<<><<<<><><<<><<><<<><<<<>>><<<<>><<<<>><>><>><<><<<>>><<<><<><<>>><<<<>>><<<>>>><<><<<>>>><<<>><<<>><>>>><>>><>><<<>><<>>>><<<<>>>><>><<>><<<>>><>>>><<>><<<>><<><<>>>><><<<><>>><<>>>><<<<>>>><<<>>>><<<>>><<<><<<>>>><<<>>>><<<>>>><<<<><>>><>><<>><<<><<<><<>><>>><<<>>><<<>><<<>>><<<<>>>><<<<><>>><<>>><>>><<<<>><<>><>>>><<>>><<<<>>><<<<>>><<<<><<<<>>><<<>><><><<<><<<<>>><>>><<><>><<>>>><<>>><<<>>>><<<<>>><<<>><<>><>>><>>><<<<>>>><<<<>>>><<>><<<<>>>><>>>><<<><<<>>><<<>>>><<<<>>><><<<<>><<><<>>>><<<<>>><<<<>>><<<<><<<>>>><<><<>>>><><<<>>>><<><<>>><<>>>><<<><<><>>><<<<>>><<<>>>><<><<>>><<<<><>>>><<>>><<<>>>><<<<><<>><<>><<>>><><<<>><<<<>><><<<<><>><<>><<<>>>><<>>>><>>>><<><>><>>><<<>>><>>>><<<><<><<<>><<<>><<>>><<><<>>><<<>>><<<>>>><>>><>><><<><<>>><<<<>>><>>><<<><<><<<>><>><<>>><>>>><<>>>><<<><>>>><<>>>><>>>><<<<>>><<>>><>>><<>><<><<<<>>>><>>><<>>>><><<><<<>>><<>><>>><<<<>>>><>>>><<<>>><<<>><<<>><<>>>><>><>>><<<><<<>>>><<<<>><<>>><<<<>>><<>>><<>>><>>>><<<<><<<>>>><<<>>><<<<><<><<>>>><<<>>><<<<>>><><<<<>><<<><<<<>><<<>><<<<><<<<>>>><>><>>><<><<<>><<<>>><><<<<>><<<<>><<>>><<<<>>><>>><>><<<>><<<>><>>><<<>>>><<<>><<<<><<><<<<>>><<<>>>><<<<>>><<<<>>><><<<>>><<<>><<<<><<<<><<<>>><<<>>>><><<<>><>>>><<<<>><<>>><<<>>><<>>>><<<<>>>><<>>>><<<<>>><<>>><<>><>>><<>>><<<<>><>>><><>><><<>>>><<>>><>>><<<<><<<<>><<<<>>><<<<>>><<<<>>>><<<<>>><<<><><<<<><>>>><>><<<<>><<<<><<>>>><><>>>><<<<>><<>>>><<<><>>>><<<>><<<>><>><>>>><<<>>><<<>>><<>>>><<<><<<>><>>>><>>><<<>>>><><<>>><<<>>>><<>>>><<<>>>><<<<><<><>><>>>><<>>>><<<<>><<<><<<<>>><>>><<<>>><>><>>>><<<<>>>><<<>><<>>><>>><<<>><<<<>>><<<>>><<>>><<>>><>>>><<>>>><<<<>>>><<>>>><<><<>><>>>><<>>>><<<<>>>><<<<><<<><>>>><<<>>>><<<<>>>><><<<><<<<><<<<>><<<><>>><<>>><>><<>>>><<>><<<<>>>><<>>><<>>>><<>><>><><>><<<<><>>><<>>>><<>>>><>>><><<<><<<<>>><<<>>>><<>>><<<<>><<>>><<<<>>><<<<>><<>>><><<>>><<>><<<>>><<>>><<<>>><<>><<><>>>><>><>>><<>><<>>><<<<>>>><<<>>>><<<<>><<<<>>>><<<<><<<><>>><<<<><<>>><<>><<<<><<<><<<><<><<><>>>><<>><<<><>><<>><<<><<<><<<>>><<<><<>><<<><<<>>>><<>>>><<><>>>><<<<>>><><<><<<>><>>>><<<>>><<<>>>><>><<<>>>><<>>>><><<<>>><<>><><<>><>>><<>>><<><<<>><<<<>><><<<<>>>><<><<<<>>>><<<<>><<<><<<<>><<<<>>><<><<><>><><<<>>>><<<>>>><<<<>><<<>>><<>>><<>>>><>>>><<>>><>>>><<<<>><<<>>><<<><>>><>>><<<><<<<>>>><<<>>>><<<<><>>><<<>><<>><<>>><<>>>><>>><<<>>><<<>>>><<<>>>><<<<>><><<<><>><>><<<<>>>><<<>>>><<><>><><<<<>>>><><>>>><<>><<<<>><<<<><<<<>>>><<<>>><<<>>><<<>><<<<>><<>><>>><<>><<>><<<<>>>><<<>><>>>><<<<>>>><<<>>>><<>>><<<>>>><<<<><<<>><<<>>><<<<>>><><<>>>><<>>><<>>>';

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(3068);
  });

  it("should run real input", () => {
    expect(partOne(realInput)).toBe(3177);
  });
});

describe("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(1514285714288);
  });

  it.skip("should run real input", () => {
    expect(partTwo(realInput)).toStrictEqual(32041);
  });
});
