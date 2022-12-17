import _ from "lodash";

type Valve = {
  name: string;
  flowRate: number;
  connectedRooms: string[];
  pathDist: Record<string, number>;
}

type GraphValve = {
  name: string;
  tentative: number;
  visited: boolean;
}

type Map = Record<string, Valve>;

type State = {
  currentRoom: string;
  openedValves: string[];
  time: number;
  openRate: number;
  totalPressure: number;
}

function shortestPaths(start: string, map: Map) {
  const graph: Record<string, GraphValve> = Object.values(map).map(v => {
    return {
      [v.name]: {
        name: v.name,
        tentative: Number.MAX_SAFE_INTEGER,
        visited: false
      }
    }
  }).reduce((a, b) => Object.assign(a, b))

  graph[start].tentative = 0;

  let next: GraphValve[] = [graph[start]];

  while (next.length > 0) {
    next = next.flatMap(n => {
      if (n.visited) {
        return [];
      }
      const neighbors = map[n.name].connectedRooms
        .map(r => graph[r])
        .filter(r => !r.visited);

      n.visited = true;
      return neighbors.map(neighbor => {
        const tentative = n.tentative + 1
        if (tentative < neighbor.tentative) {
          neighbor.tentative = tentative;
        }
        return neighbor;
      })
    })
  }

  return Object.values(graph).map(g => {
    return {
      [g.name]: g.tentative
    }
  }).reduce((a, b) => Object.assign(a, b))
}

function parseMap(input: string[]): Map {
  const map = input.map(i => {
    const [valve, connecting] = i.split(';');
    const [name, flowRate] = valve.split('=');
    return {
      [name]: {
        name,
        flowRate: parseInt(flowRate, 10),
        connectedRooms: connecting.split(','),
        pathDist: {}
      }
    }
  }).reduce((a, b) => Object.assign(a, b));

  const allValves = Object.values(map);
  allValves.forEach(valve => {
    valve.pathDist = shortestPaths(valve.name, map);
  })

  return map;
}

function iterateTotal(state: State, count: number): Pick<State, 'time' | 'totalPressure'> {
  return {
    time: state.time + count,
    totalPressure: state.totalPressure + (state.openRate * count)
  }
}

function splitAvailableByWorkers(available: Valve[]) {
  const results: [Valve, Valve][] = [];
  for (let i = 0; i < available.length - 1; i++) {
    for (let j = i + 1; j < available.length; j++) {
      results.push([available[i], available[j]])
    }
  }
  return results;
}

function step(state: State, map: Map, time: number): State[] {
  if (state.time > time) {
    return [];
  }
  if (state.time === time) {
    return [state];
  }

  const unopennedValves = Object.values(map)
    .filter(valve => valve.flowRate !== 0)
    .filter(valve => {
      return !state.openedValves.includes(valve.name)
    })

  if (unopennedValves.length === 0) {
    return [{
      ...state,
      ...iterateTotal(state, time - state.time)
    }]
  }

  return unopennedValves.flatMap(v => {
    return step({
      currentRoom: v.name,
      openedValves: state.openedValves.concat([v.name]),
      openRate: state.openRate + v.flowRate,
      ...iterateTotal(state, map[state.currentRoom].pathDist[v.name] + 1)
    }, map, time)
  });
}

export function partOne(input: string[]) {
  const map = parseMap(input);
  let initial: State = {
    currentRoom: 'AA',
    openedValves: [],
    time: 0,
    openRate: 0,
    totalPressure: 0
  }

  const outcomes = step(initial, map, 30);

  return _.max(outcomes.map(s => s.totalPressure))
}

function step2(state: State, map: Map): State[] {
  if (state.time > 26) {
    return [];
  }
  if (state.time === 26) {
    return [state];
  }

  const unopennedValves = Object.values(map)
    .filter(valve => valve.flowRate !== 0)
    .filter(valve => {
      return !state.openedValves.includes(valve.name)
    })

  if (unopennedValves.length === 0) {
    return [{
      ...state,
      ...iterateTotal(state, 26 - state.time)
    }]
  }

  return unopennedValves.flatMap(v => {
    return step2({
      currentRoom: v.name,
      openedValves: state.openedValves.concat([v.name]),
      openRate: state.openRate + v.flowRate,
      ...iterateTotal(state, map[state.currentRoom].pathDist[v.name] + 1)
    }, map)
  });
}

export function partTwo(input: string[]) {
  const map = parseMap(input);
  const initial: State = {
    currentRoom: 'AA',
    openedValves: [],
    time: 0,
    openRate: 0,
    totalPressure: 0
  }

  const myMax = _.maxBy(step(initial, map, 26), s => s.totalPressure)!;

  const elephantInitial: State = {
    currentRoom: 'AA',
    openedValves: myMax.openedValves,
    time: 0,
    openRate: 0,
    totalPressure: 0
  }
  const elephantMax = _.maxBy(step(elephantInitial, map, 26), s => s.totalPressure)!;
  
  return myMax.totalPressure + elephantMax.totalPressure
}
