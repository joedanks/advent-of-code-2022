import _ from "lodash";

type Node = {
  value: number;
  index: number;
  right?: Node;
  left?: Node;
};

function buildNodes(input: number[], decryptionKey?: number) {
  const nodes: Node[] = [];
  for (let i = 0; i < input.length; i++) {
    const last = _.last(nodes);
    const value = (decryptionKey || 1) * input[i];
    const next: Node = {
      value,
      index: i,
      right: undefined,
      left: last,
    };
    nodes.push(next);
    if (last) {
      last.right = next;
    }
  }
  nodes[0].left = _.last(nodes);

  return nodes;
}

function cutNode(node: Node) {
  let right = node.right!;
  const left = node.left!;

  left.right = right;
  right.left = left;

  return node;
}

function insertNode(node: Node) {
  if (node.value < 0) {
    let next: Node = node;
    for (let i = 0; i > node.value; i--) {
      next = next.left!;
    }
    const before = next.left!;
    node.right = next;
    node.left = before;
    next.left = node;
    before.right = node;
  } else if (node.value > 0) {
    let next: Node = node;
    for (let i = 0; i < node.value; i++) {
      next = next.right!;
    }
    const after = next.right!;
    node.right = after;
    node.left = next;
    next.right = node;
    after.left = node;
  }
}

function getNode(index: number, nodes: Node[]) {
  return nodes.find((n) => n.index === index)!;
}

function loopIndex(index: number, max: number) {
  return index % max;
}

function iterateNode(node: Node, index: number) {
  let next = node;
  for (let i = 0; i < index; i++) {
    next = next.right!;
  }
  return next;
}

function print(nodes: Node[], start: Node) {
  const final: number[] = []
  let current = start;
  for(let j = 0; j < nodes.length; j++) {
    final.push(current.value)
    current = current.right!
  }
  console.log(`Current list: ${final}`);
}

function mix(nodes: Node[]) {
  for (let i = 0; i < nodes.length; i++) {
    const node = getNode(i, nodes);
    if (node.value !== 0) {
      cutNode(node);
      insertNode(node);
    }
  }
}

export function partOne(input: number[]): number {
  const nodes = buildNodes(input);

  mix(nodes);

  const zero = nodes.find(n => n.value === 0)!;

  const one = iterateNode(zero, loopIndex(1000, input.length));
  const two = iterateNode(one, loopIndex(1000, input.length));
  const three = iterateNode(two, loopIndex(1000, input.length));

  return one.value + two.value + three.value;
}

export function partTwo(input: number[]): number {
  const decryptionKey = 811589153;
  const nodes = buildNodes(input, decryptionKey);
  
  for(let i = 0; i < 10; i++) {
    mix(nodes);
  }

  const zero = nodes.find(n => n.value === 0)!;

  const one = iterateNode(zero, loopIndex(1000, nodes.length));
  const two = iterateNode(one, loopIndex(1000, nodes.length));
  const three = iterateNode(two, loopIndex(1000, nodes.length));

  return one.value + two.value + three.value;
}
