import _ from "lodash";

type Entry = {
  position: string;
  neighbors: number;
  filled: boolean;
};

type Grid = Record<string, Entry>;

function getPositionString(x: number, y: number, z: number) {
  return `${x},${y},${z}`;
}

function readPositionString(positionString: string) {
  return positionString.split(",").map((p) => parseInt(p, 10));
}

function getNeighborPositions(positionString: string) {
  const [x, y, z] = readPositionString(positionString);

  return [
    getPositionString(x - 1, y, z),
    getPositionString(x + 1, y, z),
    getPositionString(x, y - 1, z),
    getPositionString(x, y + 1, z),
    getPositionString(x, y, z - 1),
    getPositionString(x, y, z + 1),
  ];
}

function buildGrid(input: string[]) {
  const grid: Grid = {};
  input.forEach((i) => {
    const neighbors = getNeighborPositions(i)
      .map((p) => grid[p])
      .filter((n) => n);

    neighbors.forEach((n) => n.neighbors--);
    grid[i] = {
      position: i,
      neighbors: 6 - neighbors.length,
      filled: true,
    };
  });
  return grid;
}

export function partOne(input: string[]): number {
  const grid = buildGrid(input);

  return Object.values(grid)
    .map((e) => e.neighbors)
    .reduce((a, b) => a + b);
}

type Extent = {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
  minZ: number;
  maxZ: number;
};

function maxExtents(input: string[]): Extent {
  const [xs, ys, zs] = _.unzip(input.map(readPositionString));
  return {
    minX: _.min(xs)! - 1,
    maxX: _.max(xs)! + 1,
    minY: _.min(ys)! - 1,
    maxY: _.max(ys)! + 1,
    minZ: _.min(zs)! - 1,
    maxZ: _.max(zs)! + 1,
  };
}

function inExtent(position: string, extent: Extent) {
  const [x, y, z] = readPositionString(position);
  return (
    extent.minX <= x &&
    x <= extent.maxX &&
    extent.minY <= y &&
    y <= extent.maxY &&
    extent.minZ <= z &&
    z <= extent.maxZ
  );
}

export function partTwo(input: string[]): number {
  const grid = buildGrid(input);
  const extent = maxExtents(input);
  let internalSides = 0;

  let stack: string[] = [
    getPositionString(extent.minX, extent.minY, extent.minZ),
  ];

  while (stack.length !== 0) {
    const position = stack.pop()!;

    const maybe = grid[position];
    if (!maybe) {
      const solidNeighbors = getNeighborPositions(position)
        .map((p) => grid[p])
        .filter((n) => !!n)
        .filter((n) => n.filled);
      grid[position] = {
        position,
        neighbors: solidNeighbors.length,
        filled: false,
      };
      const emptyNeighbors = getNeighborPositions(position)
        .filter((p) => !grid[p])
        .filter((p) => inExtent(p, extent));
      stack = [...new Set(emptyNeighbors.concat(stack))];
    }
  }

  const totalSides = Object.values(grid)
    .filter((e) => e.filled === false)
    .map((e) => e.neighbors)
    .reduce((a, b) => a + b);

  return totalSides;
}
