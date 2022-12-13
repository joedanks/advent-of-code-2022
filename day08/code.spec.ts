import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day08/input.json", "utf-8"));
};

const testInput = [
  "30373",
  "25512",
  "65332",
  "33549",
  "35390",
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(21);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(1845);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(8);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(230112);
  });
});
