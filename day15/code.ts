import _, { snakeCase } from "lodash";

type Sensor = {
  position: string;
  x: number;
  y: number;
  beaconPosition: string;
  distance: number;
};

function getPositionString(x: number, y: number) {
  return `${x},${y}`;
}

function readPositionString(positionString: string) {
  return positionString.split(",").map((p) => parseInt(p, 10));
}

function computeManhattanDistance(sensor: string, beacon: string): number {
  const s = readPositionString(sensor);
  const b = readPositionString(beacon);
  return Math.abs(s[0] - b[0]) + Math.abs(s[1] - b[1]);
}

function parseSensors(input: string[]): Sensor[] {
  return input.map((i) => {
    const [sensor, beacon] = i.split(":");
    const s = readPositionString(sensor);
    return {
      position: sensor,
      x: s[0],
      y: s[1],
      beaconPosition: beacon,
      distance: computeManhattanDistance(sensor, beacon),
    };
  });
}

function sensorAffectsRow(sensor: Sensor, row: number) {
  return sensor.y + sensor.distance >= row && sensor.y - sensor.distance <= row;
}

function sensorRowPoints(sensor: Sensor, row: number): [number, number][] {
  const points: [number, number][] = [];
  const rowWidth = sensor.distance - Math.abs(row - sensor.y);
  const y = row;

  for (let x = sensor.x - rowWidth; x <= sensor.x + rowWidth; x++) {
    points.push([x, y]);
  }

  return points;
}

function sensorBoundaryPoints(sensor: Sensor, max: number) {
  const points: [number, number][] = [];
  points.push([sensor.x + sensor.distance + 1, sensor.y]);
  points.push([sensor.x - sensor.distance - 1, sensor.y]);
  points.push([sensor.x, sensor.y + sensor.distance + 1]);
  points.push([sensor.x, sensor.y - sensor.distance - 1]);
  for (let i = 0; i < sensor.distance; i++) {
    points.push([sensor.x + sensor.distance - i, sensor.y + i + 1]);
    points.push([sensor.x + sensor.distance - i, sensor.y - i - 1]);
    points.push([sensor.x - sensor.distance + i, sensor.y + i + 1]);
    points.push([sensor.x - sensor.distance + i, sensor.y - i - 1]);
  }
  return points.filter((p) => {
    return 0 <= p[0] && p[0] <= max && 0 <= p[1] && p[1] <= max;
  });
}

export function partOne(input: string[], row: number): number {
  const sensors = parseSensors(input);

  const usefulSensors = sensors.filter((s) => sensorAffectsRow(s, row));
  const covered = usefulSensors
    .flatMap((s) => {
      const sensorPoints = sensorRowPoints(s, row);
      const usefulPoints = sensorPoints.filter(([x, y]) => y === row);
      return usefulPoints;
    })
    .map(([x, y]) => getPositionString(x, y));

  sensors.forEach((s) => {
    _.pull(covered, s.beaconPosition);
  });

  return _.uniq(covered).length;
}

function sensorCoversPoint(sensor: Sensor, point: [number, number]) {
  const dist = computeManhattanDistance(
    sensor.position,
    getPositionString(point[0], point[1])
  );
  if (dist <= sensor.distance) {
    return true;
  }
  return false;
}

export function partTwo(input: string[], size: number) {
  const sensors = parseSensors(input);

  const found = sensors
    .map((s) => {
      const points = sensorBoundaryPoints(s, size);
      const otherSensors = _.without(sensors, s);
      const point = points
        .map((p) => {
          return [
            p,
            otherSensors.some((os) => {
              return sensorCoversPoint(os, p);
            }),
          ];
        })
        .find((p) => {
          return !p[1];
        });
      return point ? point[0] : undefined;
    })
    .find((p) => p)!;

  return found[0] * 4000000 + found[1];
}
