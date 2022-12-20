import _ from "lodash";

type Entry = {
  position: string;
  neighbors: number;
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
    minX: _.min(xs)!,
    maxX: _.max(xs)!,
    minY: _.min(ys)!,
    maxY: _.max(ys)!,
    minZ: _.min(zs)!,
    maxZ: _.max(zs)!,
  };
}

export function partTwo(input: string[]): number {
  const grid = buildGrid(input);
  const extent = maxExtents(input);
  let airPockets = 0;

  for (let z = extent.minZ; z <= extent.maxZ; z++) {
    for (let y = extent.minY; y <= extent.maxY; y++) {
      for (let x = extent.minX; x <= extent.maxX; x++) {
        const position = getPositionString(x, y, z);
        if (!grid[position]) {
          const neighborPositions = getNeighborPositions(position);
          const neighbors = neighborPositions.map((n) => grid[n]);

          const singleHole = neighbors.every((n) => n);

          if(singleHole) {
            airPockets++;
            continue;
          }
          if(neighbors.filter(n => n).length === 5) {
            
          }
        }
      }
    }
  }

  const totalSides = Object.values(grid)
    .map((e) => e.neighbors)
    .reduce((a, b) => a + b);

  return totalSides - (airPockets * 6);
}
