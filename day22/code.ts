import _ from "lodash";

const directions = [
  0, //Right
  1, //Down
  2, //Left
  3, //Up
]

type Location = {
  position: string;
  value: string;
};

type Grid = Record<string, Location>;

function getPositionString(x: number, y: number) {
  return `${x},${y}`;
}

function readPositionString(position: string) {
  return position.split(",").map((p) => parseInt(p, 10));
}

function changeDirection(current: number, change: string): number {
  if (change === "L") {
    const next = current - 1;
    if (next === -1) {
      return directions[3];
    }
    return directions[next];
  }
  const next = current + 1;
  if (next === 4) {
    return directions[0];
  }
  return directions[next];
}

function parseGrid(input: string[]): [Grid, number] {
  const grid: Grid = {};
  let maxWidth = 0;
  for (let y = 0; y < input.length; y++) {
    const row = input[y].split("");
    for (let x = 0; x < row.length; x++) {
      if (row[x] !== " ") {
        const position = getPositionString(x, y);
        grid[position] = {
          position,
          value: row[x],
        };
      }
    }
    maxWidth = Math.max(maxWidth, row.length);
  }

  return [grid, maxWidth];
}

function parseInstructions(raw: string) {
  const regex = /(\d+)([RL])/g;
  let result = regex.exec(raw);
  const instructions: [number, string][] = [];
  while (result) {
    instructions.push([parseInt(result[1], 10), result[2]]);
    result = regex.exec(raw);
  }
  return instructions;
}

function getGridPositionBiasRight(
  position: string,
  grid: Grid,
  maxWidth: number
) {
  let maybe = grid[position];
  if (maybe) {
    return maybe;
  }
  let [x, y] = readPositionString(position);
  while (!maybe) {
    if (x >= maxWidth) {
      x = 0;
    }
    maybe = grid[getPositionString(x, y)];
    x++;
  }
  return maybe;
}
function getGridPositionBiasLeft(
  position: string,
  grid: Grid,
  maxWidth: number
) {
  let maybe = grid[position];
  if (maybe) {
    return maybe;
  }
  let [x, y] = readPositionString(position);
  while (!maybe) {
    if (x < 0) {
      x = maxWidth - 1;
    }
    maybe = grid[getPositionString(x, y)];
    x--;
  }
  return maybe;
}
function getGridPositionBiasUp(
  position: string,
  grid: Grid,
  maxHeight: number
) {
  let maybe = grid[position];
  if (maybe) {
    return maybe;
  }
  let [x, y] = readPositionString(position);
  while (!maybe) {
    if (y < 0) {
      y = maxHeight - 1;
    }
    maybe = grid[getPositionString(x, y)];
    y--;
  }
  return maybe;
}
function getGridPositionBiasDown(
  position: string,
  grid: Grid,
  maxHeight: number
) {
  let maybe = grid[position];
  if (maybe) {
    return maybe;
  }
  let [x, y] = readPositionString(position);
  while (!maybe) {
    if (y >= maxHeight) {
      y = 0;
    }
    maybe = grid[getPositionString(x, y)];
    y++;
  }
  return maybe;
}

function move(
  currentPosition: string,
  direction: number,
  instruction: [number, string],
  grid: Grid,
  maxWidth: number,
  maxHeight: number
): [string, number] {
  const [startX, startY] = readPositionString(currentPosition);
  let [currentX, currentY] = [startX, startY];
  for (let i = 0; i < instruction[0]; i++) {
    let next: Location;
    switch (direction) {
      case 0: //Right
        next = getGridPositionBiasRight(
          getPositionString(currentX + 1, currentY),
          grid,
          maxWidth
        );
        if (next.value === ".") {
          [currentX, currentY] = readPositionString(next.position);
        } else if (next.value === "#") {
          return [
            getPositionString(currentX, currentY),
            changeDirection(direction, instruction[1]),
          ];
        }
        break;
      case 1: //Down
        next = getGridPositionBiasDown(
          getPositionString(currentX, currentY + 1),
          grid,
          maxWidth
        );
        if (next.value === ".") {
          [currentX, currentY] = readPositionString(next.position);
        } else if (next.value === "#") {
          return [
            getPositionString(currentX, currentY),
            changeDirection(direction, instruction[1]),
          ];
        }
        break;
      case 2: // Left
        next = getGridPositionBiasLeft(
          getPositionString(currentX - 1, currentY),
          grid,
          maxWidth
        );
        if (next.value === ".") {
          [currentX, currentY] = readPositionString(next.position);
        } else if (next.value === "#") {
          return [
            getPositionString(currentX, currentY),
            changeDirection(direction, instruction[1]),
          ];
        }
        break;
      case 3: //Up
        next = getGridPositionBiasUp(
          getPositionString(currentX, currentY - 1),
          grid,
          maxWidth
        );
        if (next.value === ".") {
          [currentX, currentY] = readPositionString(next.position);
        } else if (next.value === "#") {
          return [
            getPositionString(currentX, currentY),
            changeDirection(direction, instruction[1]),
          ];
        }
        break;
    }
  }
  return [
    getPositionString(currentX, currentY),
    changeDirection(direction, instruction[1]),
  ];
}

export function partOne(input: string[], rawInstructions: string): number {
  const [grid, maxWidth] = parseGrid(input);
  const instructions = parseInstructions(rawInstructions);
  let current: string = getGridPositionBiasRight(
    getPositionString(0, 0),
    grid,
    maxWidth
  ).position;
  let direction = 0;

  instructions.forEach(([distance, turn]) => {
    [current, direction] = move(current, direction, [distance, turn], grid, maxWidth, input.length);
  });

  const [x, y] = readPositionString(current);

  return (1000 * (y + 1)) + (4 * (x + 1)) + direction;
}

export function partTwo(input: string[]): number {
  return -1;
}
