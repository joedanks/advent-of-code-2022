import _ from "lodash";

export type Monkey = {
  items: bigint[];
  operation: [string, string, string];
  test: {
    div: bigint;
    yes: number;
    no: number;
  };
  inspected: number;
};

function newWorry(operation: [string, string, string], old: bigint) {
  return eval(operation.map((o) => (o === "old" ? old : o)).join(""));
}

function reduceWorry(itemWorry: bigint): bigint {
  return BigInt(itemWorry) / 3n;
}

function monkeyInspect(monkey: Monkey, itemWorry: bigint): [number, bigint] {
  const updatedWorry: bigint = newWorry(monkey.operation, itemWorry);
  const postInspectionWorry: bigint = reduceWorry(updatedWorry);

  monkey.inspected++;
  const testResult = postInspectionWorry / BigInt(monkey.test.div);
  if (BigInt(monkey.test.div) * testResult === postInspectionWorry) {
    return [monkey.test.yes, postInspectionWorry];
  }
  return [monkey.test.no, postInspectionWorry];
}

export function partOne(input: Monkey[]) {
  for (let i = 0; i < 20; i++) {
    for (const monkey of input) {
      monkey.items
        .map((item) => monkeyInspect(monkey, item))
        .forEach(([toMonkey, item]) => {
          input[toMonkey].items.push(item);
        });
      monkey.items = [];
    }
  }

  const inspections = input.map((monkey, index) => {
    return monkey.inspected
  }).sort((a, b) => b - a);

  const [first, second] = _.take(inspections, 2);

  return first * second;
}

function manualNewWorry(operation: [string, string, string], old: bigint) {
  const [a, operator, b] = operation.map((o) => (o === "old" ? old : o))
  switch(operator) {
    case '*':
      return BigInt(a) * BigInt(b);
    case '+':
      return BigInt(a) + BigInt(b);
    case '-':
      return BigInt(a) - BigInt(b);
    case '/':
      throw new Error('Should not be dividing big ints like this')
    default:
      throw new Error(`Missed an operator: ${operator}`)
  }
}

function monkeyInspectNotHelpful(monkey: Monkey, itemWorry: bigint, commonFactor: bigint): [number, bigint] {
  const updatedWorry: bigint = manualNewWorry(monkey.operation, itemWorry);
  const dropCommon = updatedWorry % commonFactor;

  monkey.inspected++;
  const testResult = BigInt(dropCommon) / BigInt(monkey.test.div);
  if (BigInt(monkey.test.div) * BigInt(testResult) === dropCommon) {
    return [monkey.test.yes, dropCommon];
  }
  return [monkey.test.no, dropCommon];
}

export function partTwo(input: Monkey[]) {
  const commonFactor = BigInt(input.map(m => m.test.div).reduce((a, b) => a * b));
  for (let i = 0; i < 10000; i++) {
    for (const monkey of input) {
      monkey.items
        .map((item) => monkeyInspectNotHelpful(monkey, item, commonFactor))
        .forEach(([toMonkey, item]) => {
          input[toMonkey].items.push(item);
        });
      monkey.items = [];
    }
  }

  const inspections = input.map((monkey, index) => {
    return monkey.inspected
  }).sort((a, b) => b - a);

  const [first, second] = _.take(inspections, 2);

  return [first, second];
}
