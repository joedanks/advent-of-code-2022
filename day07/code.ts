import _ from "lodash";

class Node {
  public readonly name: string;
  public readonly children: Node[];
  public readonly parent?: Node;
  public readonly size: number;

  constructor(parent: Node | undefined, name: string, size = 0) {
    this.parent = parent;
    this.name = name;
    this.size = size;
    this.children = [];
  }

  getSize() {
    if (this.size != 0) {
      return this.size;
    }
    return this.children.reduce((acc, c) => acc + c.getSize(), 0);
  }

  addChild(child: Node) {
    this.children.push(child);
  }
}

function buildTree(input: string[]) {
  const root = new Node(undefined, "/");
  let currentNode = root;

  let index = 0;
  while (index < input.length) {
    const instruction = input[index];

    switch (instruction) {
      case "$ cd /":
        currentNode = root;
        break;
      case "$ ls":
        let next = input[index + 1];
        while (next && !next.startsWith("$")) {
          if (next.startsWith("dir")) {
            currentNode.addChild(new Node(currentNode, next.split(" ")[1]));
          } else {
            const [size, file] = next.split(" ");
            currentNode.addChild(
              new Node(currentNode, file, Number.parseInt(size, 10))
            );
          }
          index++;
          next = input[index + 1];
        }
        break;
      case "$ cd ..":
        currentNode = currentNode.parent || root;
        break;
      default:
        const directory = instruction.split(" ")[2];
        currentNode = currentNode.children.find((x) => x.name === directory)!;
        break;
    }
    index++;
  }

  return root;
}

function getDirectories(node: Node) {
  const directDirectories = node.children.filter(
    (c) => c.children.length !== 0
  );
  const childDirectories = node.children.flatMap((c) => getDirectories(c));

  return directDirectories.concat(childDirectories);
}

export function partOne(input: string[]) {
  const root = buildTree(input);

  const directories = getDirectories(root);

  return directories
    .map((d) => [d, d.getSize()])
    .filter(([d, size]) => size <= 100000)
    .reduce((acc, [d, size]) => acc + size, 0);
}

export function partTwo(input: string[]): string {
  const root = buildTree(input);

  const currentAvailableSpace = 70000000 - root.getSize();
  const requiredRemovedSpace = 30000000 - currentAvailableSpace;

  const directories = getDirectories(root);

  return directories
    .map((d: Node) => [d, d.getSize()])
    .filter(([d, size]) => size >= requiredRemovedSpace)
    .sort((a, b) => b[1] - a[1])
    .map(([d, size]) => size)
    .pop();
}
