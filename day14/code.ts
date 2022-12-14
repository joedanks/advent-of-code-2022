import _ from "lodash";

enum Element {
  Air,
  Rock,
  Sand,
}

type Location = {
  position: string;
  element: Element;
};

type Grid = Record<string, Location>;

function getPositionString(x: number, y: number) {
  return `${x},${y}`;
}

function readPositionString(positionString: string) {
  return positionString.split(",").map((p) => parseInt(p, 10));
}

function getBottomNeighborPosition(positionString: string) {
  const [x, y] = readPositionString(positionString);

  return getPositionString(x, y + 1);
}

function getBottomLeftNeighborPosition(positionString: string) {
  const [x, y] = readPositionString(positionString);

  return getPositionString(x - 1, y + 1);
}

function getBottomRightNeighborPosition(positionString: string) {
  const [x, y] = readPositionString(positionString);

  return getPositionString(x + 1, y + 1);
}

function drawLine(start: number[], end: number[], grid: Grid) {
  if (start[0] === end[0]) {
    const x = start[0];
    const startY = Math.min(start[1], end[1]);
    const endY = Math.max(start[1], end[1]);
    for (let y = startY; y <= endY; y++) {
      grid[getPositionString(x, y)] = {
        position: getPositionString(x, y),
        element: Element.Rock,
      };
    }
  } else if (start[1] === end[1]) {
    const y = start[1];
    const startX = Math.min(start[0], end[0]);
    const endX = Math.max(start[0], end[0]);
    for (let x = startX; x <= endX; x++) {
      grid[getPositionString(x, y)] = {
        position: getPositionString(x, y),
        element: Element.Rock,
      };
    }
  }
}

function parseGrid(input: string[]) {
  const grid = {};
  input.forEach((i) => {
    const points = i.split(" -> ");
    for (let j = 0; j < points.length - 1; j++) {
      const start = readPositionString(points[j]);
      const end = readPositionString(points[j + 1]);

      drawLine(start, end, grid);
    }
  });
  return grid;
}

function getLocationFromGrid(
  positionString: string,
  grid: Grid,
  bottom?: number
) {
  let maybeLocation: Location = grid[positionString];
  if (!maybeLocation) {
    maybeLocation = {
      position: positionString,
      element: Element.Air,
    };
    if (bottom && readPositionString(positionString)[1] >= bottom) {
      maybeLocation.element = Element.Rock;
    }
  }
  return maybeLocation;
}

function computeBottom(grid: Grid) {
  const yPositions = Object.values(grid)
    .map((l) => l.position)
    .map(readPositionString)
    .map((p) => p[1]);

  return _.max(yPositions) || 0;
}

function moveSand(location: Location, grid: Grid, bottom?: number) {
  const below = getLocationFromGrid(
    getBottomNeighborPosition(location.position),
    grid,
    bottom
  );
  const belowLeft = getLocationFromGrid(
    getBottomLeftNeighborPosition(location.position),
    grid,
    bottom
  );
  const belowRight = getLocationFromGrid(
    getBottomRightNeighborPosition(location.position),
    grid,
    bottom
  );

  if (below.element === Element.Air) {
    location.element = Element.Air;
    below.element = Element.Sand;
    grid[below.position] = below;
    return below;
  } else if (belowLeft.element === Element.Air) {
    location.element = Element.Air;
    belowLeft.element = Element.Sand;
    grid[belowLeft.position] = belowLeft;
    return belowLeft;
  } else if (belowRight.element === Element.Air) {
    location.element = Element.Air;
    belowRight.element = Element.Sand;
    grid[belowRight.position] = belowRight;
    return belowRight;
  }
  return location;
}

export function partOne(input: string[]) {
  const grid = parseGrid(input);
  const bottom = computeBottom(grid);

  let oblivion = false;
  let sandCounter = 1;
  let sand = getLocationFromGrid("500,0", grid);
  sand.element = Element.Sand;

  while (!oblivion) {
    const newSand = moveSand(sand, grid);
    if (sand !== newSand) {
      if (readPositionString(newSand.position)[1] >= bottom) {
        console.log(`OBLIVION!!! ${newSand.position} & ${bottom}`);
        oblivion = true;
        break;
      }
      sand = newSand;
    } else {
      sand = getLocationFromGrid("500,0", grid);
      sand.element = Element.Sand;
      sandCounter++;
    }
  }

  return sandCounter - 1;
}

export function partTwo(input: string[]) {
  const grid = parseGrid(input);
  const bottom = computeBottom(grid) + 2;

  let oblivion = false;
  let sandCounter = 1;
  let sand = getLocationFromGrid("500,0", grid);
  sand.element = Element.Sand;

  while (!oblivion) {
    const newSand = moveSand(sand, grid, bottom);
    if (sand !== newSand) {
      sand = newSand;
    } else {
      if (readPositionString(newSand.position)[1] === 0) {
        console.log(`OBLIVION!!! ${newSand.position}`);
        oblivion = true;
        break;
      }
      sand = getLocationFromGrid("500,0", grid);
      sand.element = Element.Sand;
      sandCounter++;
    }
  }

  return sandCounter;
}
