import _ from "lodash";

type Location = {
  position: string;
  tentative: number;
  height: number;
  visited: boolean;
  start: boolean;
  end: boolean;
}

type Grid = Record<string, Location>;

function translateHeight(problem: string) {
  if (problem === 'S') {
    return 0;
  }
  if (problem === 'E') {
    return 27;
  }
  return problem.codePointAt(0)! - 96
}

function getPositionString(x, y) {
  return `${x},${y}`
}

function readPositionString(positionString) {
  return positionString.split(',').map(p => parseInt(p, 10))
}

function getNeighborPositions(positionString) {
  const [x, y] = readPositionString(positionString)

  return [
    getPositionString(x + 1, y),
    getPositionString(x, y + 1),
    getPositionString(x, y - 1),
    getPositionString(x - 1, y),
  ]
}

function parseGrid(rawInput: string[]): Grid {
  return rawInput.map((row, y) => {
    return row.split('').map((position, x) => {
      const positionString = getPositionString(x, y)

      const height = translateHeight(position);
      return {
        [positionString]: {
          position: positionString,
          tentative: Number.POSITIVE_INFINITY,
          height: height === 0 ? 1 : (height === 27 ? 26 : height),
          visited: false,
          start: height === 0,
          end: height === 27
        }
      }
    }).reduce((a, b) => Object.assign({}, a, b), {})
  }).reduce((a, b) => Object.assign({}, a, b), {})
}

function getStartPosition(grid: Grid) {
  return Object.values(grid).find(l => l.start)!;
}

function getEndPosition(grid: Grid) {
  return Object.values(grid).find(l => l.end)!;
}

function updateNeighbors(location: Location, grid: Grid) {
  if (location.visited) {
    return []
  }

  const neighbors = getNeighborPositions(location.position)
    .map(p => grid[p])
    .filter(l => l)
    .filter(l => l.height <= location.height + 1)
    .filter(l => !l.visited)

  const changedNeighbors = neighbors
    .flatMap(neighbor => {
      const tentative = location.tentative + 1;
      if (tentative < neighbor.tentative) {
        neighbor.tentative = tentative;
        return [neighbor]
      }
      return []
    })
  location.visited = true
  return changedNeighbors;
}

function getUnVisitedNeighborPositions(grid: Grid) {
  const unvisitedNeighbors = Object.entries(grid)
    .filter(([key, value]) => value.visited)
    .flatMap(([key, value]) => getNeighborPositions(key))
    .filter(p => grid[p])
    .filter(p => !grid[p].visited)

  return [...new Set(unvisitedNeighbors)]
}

function getUnVisitedNeighbors(grid: Grid) {
  return getUnVisitedNeighborPositions(grid)
    .map(p => grid[p])
}

function sortPriority(a: Location, b: Location) {
  return a.tentative - b.tentative
}

function calculateDistanceFromStart(start: Location, grid: Grid) {
  const end = getEndPosition(grid);

  let priorityQueue = updateNeighbors(start, grid).sort(sortPriority);

  while (priorityQueue.length) {
    const next = priorityQueue.shift()!

    if (next !== end) {

      priorityQueue = [... new Set(priorityQueue.concat(updateNeighbors(next, grid)))].sort(sortPriority)
    }
  }

  return end.tentative
}

export function partOne(input: string[]) {
  const grid = parseGrid(input);
  const start = getStartPosition(grid);

  start.tentative = 0;

  return calculateDistanceFromStart(start, grid);
}

function getLowPoints(input: string[]): string[] {
  return input.map((row, y) => {
    const position = _.head(row.split(''))!
    return [getPositionString(0, y), position]
  }).filter(([positionString, position]) => position === 'a' || position === 'S')
    .map(([positionString]) => positionString);
}

export function partTwo(input: string[]) {
  const lows = getLowPoints(input);

  const paths = lows.map(location => {
    const grid = parseGrid(input);
    const start = grid[location];
    start.tentative = 0;

    const distance = calculateDistanceFromStart(start, grid);
    console.log(`Found distance: ${distance} for start: ${location}`)
    return distance;
  }).sort((a, b) => b - a)
  
  return paths.pop();
}
