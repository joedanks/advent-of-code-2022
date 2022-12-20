import _ from "lodash";

type Rock = [string, string][];

type Grid = Record<string, string>;

function getPositionString(x: number, y: number) {
  return `${x},${y}`;
}

function readPositionString(positionString: string) {
  return positionString.split(",").map((p) => parseInt(p, 10));
}

function initialGrid() {
  return {
    [getPositionString(1, 0)]: "#",
    [getPositionString(2, 0)]: "#",
    [getPositionString(3, 0)]: "#",
    [getPositionString(4, 0)]: "#",
    [getPositionString(5, 0)]: "#",
    [getPositionString(6, 0)]: "#",
    [getPositionString(7, 0)]: "#",
  };
}

function maxHeight(grid: Grid): number {
  const ys = Object.entries(grid)
    .filter(([key, value]) => value === "#")
    .map(([key, value]) => key)
    .map(readPositionString)
    .map((position) => position[1]);
  return _.max(ys)!;
}

function relativeHeights(grid: Grid): number[] {
  const positions = Object.entries(grid)
    .filter(([key, value]) => value === "#")
    .map(([key, value]) => key)
    .map(readPositionString);

  const group = _.groupBy(positions, (p) => p[0]);
  const maxes = Object.entries(group)
    .map(([x, ys]) => ([parseInt(x, 10), _.max(ys.map(([_, y]) => y))!]));

  const max = _.max(maxes.map(([key, value]) => value))!;

  return _.sortBy(maxes, [m => m[0]])
    .map(([x, y]) => y - max)
}

function getDash(height: number): Rock {
  return [
    [getPositionString(3, height), "#"],
    [getPositionString(4, height), "#"],
    [getPositionString(5, height), "#"],
    [getPositionString(6, height), "#"],
  ];
}

function getPlus(height: number): Rock {
  return [
    [getPositionString(3, height + 1), "#"],
    [getPositionString(4, height + 1), "#"],
    [getPositionString(5, height + 1), "#"],
    [getPositionString(4, height), "#"],
    [getPositionString(4, height + 2), "#"],
  ];
}

function getL(height: number): Rock {
  return [
    [getPositionString(3, height), "#"],
    [getPositionString(4, height), "#"],
    [getPositionString(5, height), "#"],
    [getPositionString(5, height + 1), "#"],
    [getPositionString(5, height + 2), "#"],
  ];
}

function getBar(height: number): Rock {
  return [
    [getPositionString(3, height), "#"],
    [getPositionString(3, height + 1), "#"],
    [getPositionString(3, height + 2), "#"],
    [getPositionString(3, height + 3), "#"],
  ];
}

function getBrick(height: number): Rock {
  return [
    [getPositionString(3, height), "#"],
    [getPositionString(4, height), "#"],
    [getPositionString(3, height + 1), "#"],
    [getPositionString(4, height + 1), "#"],
  ];
}

function getJet(input: string[], index: number) {
  return input[index % input.length] === "<" ? -1 : 1;
}

function getNextRock(index: number, maxHeight: number) {
  const rocks = [getDash, getPlus, getL, getBar, getBrick];
  return rocks[index % rocks.length](maxHeight + 4);
}

function readPositionFromGrid(grid: Grid, position: string) {
  const [x, y] = readPositionString(position);
  return readFromGrid(grid, x, y);
}

function readFromGrid(grid: Grid, x: number, y: number) {
  const position = getPositionString(x, y);
  const maybe = grid[position];
  if (maybe) {
    return maybe;
  } else if (x < 1 || x > 7) {
    return "|";
  }
  return ".";
}

function moveRock(rock: Rock, x: number, y: number): Rock {
  return rock.map(([position, value]) => {
    const [rx, ry] = readPositionString(position);
    return [getPositionString(rx + x, ry + y), value];
  });
}

function getNeighbors(
  rock: Rock,
  x: number,
  y: number,
  grid: Grid
) {
  return moveRock(rock, x, y)
    .map(([position]) => [position, readPositionFromGrid(grid, position)])
    .filter(([position, value]) => {
      return !rock.includes([position, value]);
    });
}

function jetMovedRock(rock: Rock, jet: number, grid: Grid): Rock {
  const canMove = getNeighbors(rock, jet, 0, grid)
    .map(([key, value]) => value)
    .every((value) => value === ".");
  if (canMove) {
    return moveRock(rock, jet, 0);
  }
  return rock;
}

function moveRockDown(rock: Rock, grid: Grid): Rock {
  const canMove = getNeighbors(rock, 0, -1, grid)
    .map(([key, value]) => value)
    .every(value => value === '.');
  if (canMove) {
    return moveRock(rock, 0, -1)
  }
  return rock;
}

export function partOne(input: string): number {
  const jets = input.split("");
  let grid = initialGrid();

  let jetCounter = 0;

  for (let i = 0; i < 2022; i++) {
    const height = maxHeight(grid);
    let rock = getNextRock(i, height);
    let moved = true;
    while (moved) {
      const jet = getJet(jets, jetCounter);
      jetCounter++;
      //move rock with jet
      const jetted = jetMovedRock(rock, jet, grid);
      //move rock down
      const rockDown = moveRockDown(jetted, grid);
      if (_.intersection(jetted, rockDown).length === jetted.length) {
        moved = false;
      }
      rock = rockDown;
    }
    grid = Object.assign(grid, Object.fromEntries(rock));
  }

  return maxHeight(grid);
}

export function partTwo(input: string) {
  const cache: Record<string, number[]> = {};
  const heightCache: Record<string, number> = {};
  const jets = input.split("");
  let grid = initialGrid();

  let jetCounter = 0;

  for (let i = 0; i < 100; i++) {
    const height = maxHeight(grid);
    let rock = getNextRock(i, height);
    let moved = true;
    while (moved) {
      const jet = getJet(jets, jetCounter);
      jetCounter++;
      //move rock with jet
      const jetted = jetMovedRock(rock, jet, grid);
      //move rock down
      const rockDown = moveRockDown(jetted, grid);
      if (_.intersection(jetted, rockDown).length === jetted.length) {
        moved = false;
      }
      rock = rockDown;
    }
    grid = Object.assign(grid, Object.fromEntries(rock));

    const relative = relativeHeights(grid).join(',');
    const maybe = cache[relative];
    if (maybe) {
      // console.log(`Found relative: ${relative} after ${i} with hit ${maybe}!!!`);
      cache[relative].push(i)
    } else {
      cache[relative] = [i];
    }
    heightCache[i] = maxHeight(grid);
  }

  const entry = Object.entries(cache)
    .find(([key, value]) => value.length >= 2)!;

  const diff = entry[1][1] - entry[1][0]; 

  const base = Math.floor(1000000000000 / diff) * heightCache[diff]
  const extra = heightCache[1000000000000 % diff]

  return base + extra;
}
