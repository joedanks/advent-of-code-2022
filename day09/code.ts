import _ from "lodash";

function parseInstruction(input: string): [string, number] {
  const split = input.split(' ');
  return [split[0], parseInt(split[1], 10)];
}

function stringifyPosition([x, y]: [number, number]) {
  return `${x},${y}`;
}

function isTailTooFar(head: [number, number], tail: [number, number]) {
  if (Math.abs(head[0] - tail[0]) > 1) {
    return true;
  } else if (Math.abs(head[1] - tail[1]) > 1) {
    return true;
  }
  return false;
}

function moveHead(currentHead: [number, number], currentTail: [number, number], direction: string) {
  let nextHead;
  switch(direction) {
    case 'R':
      nextHead = [currentHead[0] + 1, currentHead[1]];
      break;
    case 'L':
      nextHead = [currentHead[0] - 1, currentHead[1]];
      break;
    case 'U':
      nextHead = [currentHead[0], currentHead[1] + 1];
      break;
    case 'D':
      nextHead = [currentHead[0], currentHead[1] - 1];
      break;
    default:
      throw new Error(`bad direction: ${direction}`)
  }

  if (isTailTooFar(nextHead, currentTail)){
    return [
      nextHead,
      currentHead
    ]
  } else {
    return [
      nextHead,
      currentTail
    ]
  }
}

function moveRope(rope: [number, number][], direction: string) {
  const currentHead = _.head(rope)!;
  let nextRope: [number, number][] = [];
  switch(direction) {
    case 'R':
      nextRope.push([currentHead[0] + 1, currentHead[1]]);
      break;
    case 'L':
      nextRope.push([currentHead[0] - 1, currentHead[1]]);
      break;
    case 'U':
      nextRope.push([currentHead[0], currentHead[1] + 1]);
      break;
    case 'D':
      nextRope.push([currentHead[0], currentHead[1] - 1]);
      break;
    default:
      throw new Error(`bad direction: ${direction}`)
  }

  //move first knot
  const firstCurrent = rope[1];
  const nextHead = nextRope[0];

  let diff = [0,0];

  if(isTailTooFar(nextHead, firstCurrent)) {
    nextRope.push(currentHead);
    diff = [
      currentHead[0] - firstCurrent[0],
      currentHead[1] - firstCurrent[1]
    ];
  } else {
    nextRope.push(firstCurrent);
  }
  
  for(let i = 2; i < rope.length; i++) {
    const knot = rope[i];
    if (isTailTooFar(nextRope[i-1], knot)) {
      nextRope.push([
        knot[0] + diff[0],
        knot[1] + diff[1]
      ]);
    } else {
      nextRope.push(knot);
    }
  }

  return nextRope;
}

export function partOne(input: string[]) {
  let head: [number, number] = [0, 0];
  let tail: [number, number] = [0, 0];
  const tails = new Set().add(stringifyPosition(tail));
  for(const instruction of input) {
    const [direction, count] = parseInstruction(instruction);

    for (let i = 0; i < count; i ++) {
      [head, tail] = moveHead(head, tail, direction)
      tails.add(stringifyPosition(tail));
    }
  }

  return tails.size
}

export function partTwo(input: string[]) {
  let rope: [number, number][] = _.range(0, 10, 1).map(i => [0, 0]);
  const tails = new Set().add(stringifyPosition(_.last(rope)!));
  for(const instruction of input) {
    const [direction, count] = parseInstruction(instruction);

    for (let i = 0; i < count; i ++) {
      rope = moveRope(rope, direction);
      const tail = _.last(rope)!;
      // console.log(JSON.stringify(tail));
      tails.add(stringifyPosition(tail));
    }
  }

  return tails.size
}
