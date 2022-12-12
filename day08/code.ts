import _ from "lodash";

function getPositionString(x: number, y: number) {
  return `${x},${y}`;
}

function readPositionString(position: string) {
  return position.split(",").map((p) => parseInt(p, 10));
}

function buildGrid(input: string[]): [Record<string, number>, number] {
  let max = 0;
  const grid = input.reduce((acc, curr, y) => {
    if (y > max) {
      max = y;
    }
    const nextRow = curr
      .split("")
      .map((t, x) => {
        return {
          [getPositionString(x, y)]: parseInt(t, 10),
        };
      })
      .reduce((prev, next) => {
        return Object.assign(prev, next);
      });

    return Object.assign(acc, nextRow);
  }, {});

  return [grid, max];
}

function getPathToEdges(position: string, max: number) {
  const [x, y] = readPositionString(position);

  const left = _.range(0, x, 1).map((xx) => getPositionString(xx, y));
  const right = _.range(max, x, -1).map((xx) => getPositionString(xx, y));
  const up = _.range(0, y, 1).map((yy) => getPositionString(x, yy));
  const down = _.range(max, y, -1).map((yy) => getPositionString(x, yy));

  return [left, right, up, down];
}

function getPositionHeight(
  position: string,
  grid: Record<string, number>
): number {
  return grid[position] !== undefined ? grid[position] : -1;
}

function isVisible(
  position: string,
  treeHeight: number,
  grid: Record<string, number>,
  max: number
) {
  const paths = getPathToEdges(position, max).sort(
    (a, b) => a.length - b.length
  );
  return paths.some((path) =>
    path.every((p) => treeHeight > getPositionHeight(p, grid))
  );
}

export function partOne(input: string[]) {
  const [grid, max] = buildGrid(input);

  return Object.entries(grid)
    .map(([position, treeHeight]) => isVisible(position, treeHeight, grid, max))
    .filter((x) => x).length;
}

function scenicScore(
  position: string,
  treeHeight: number,
  grid: Record<string, number>,
  max: number
) {
  const paths = getPathToEdges(position, max);
  const scores = paths.map((path) => {
    let stop = false;
    let index = 0;
    path.reverse();
    while (path.length !== 0 && !stop) {
      const nextHeight = getPositionHeight(path[index], grid);
      if (nextHeight === -1) {
        stop = true;
        break;
      }
      if (nextHeight >= treeHeight) {
        stop = true;
      }
      index++;
    }
    return index;
  });
  return scores.reduce((acc, curr) => acc * curr);
}

export function partTwo(input: string[]) {
  const [grid, max] = buildGrid(input);

  const scores = Object.entries(grid)
    .map(([position, treeHeight]) => scenicScore(position, treeHeight, grid, max));
  return scores
    .sort((a, b) => a - b)
    .pop();
}
