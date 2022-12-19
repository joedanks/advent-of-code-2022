import * as fs from "fs";
import { partOne, partTwo } from "./code";

const loadInput = () => {
  return JSON.parse(fs.readFileSync("day07/input.json", "utf-8"));
};

const testInput = [
  "$ cd /",
  "$ ls",
  "dir a",
  "14848514 b.txt",
  "8504156 c.dat",
  "dir d",
  "$ cd a",
  "$ ls",
  "dir e",
  "29116 f",
  "2557 g",
  "62596 h.lst",
  "$ cd e",
  "$ ls",
  "584 i",
  "$ cd ..",
  "$ cd ..",
  "$ cd d",
  "$ ls",
  "4060174 j",
  "8033020 d.log",
  "5626152 d.ext",
  "7214296 k",
];

describe.skip("Part 1", () => {
  it("should pass test input", () => {
    expect(partOne(testInput)).toBe(95437);
  });

  it("should run real input", () => {
    expect(partOne(loadInput())).toBe(1915606);
  });
});

describe.skip("Part 2", () => {
  it("should pass test input", () => {
    expect(partTwo(testInput)).toBe(24933642);
  });

  it("should run real input", () => {
    expect(partTwo(loadInput())).toBe(5025657);
  });
});
