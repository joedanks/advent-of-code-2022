import _ from "lodash";

type Monkey = {
  name: string;
  command: string;
}
type Monkeys = Record<string, Monkey>

function parseMonkeys(input: string[]): Monkeys {
  return input.map(i => {
    const [monkey, command] = i.split(':')
    return {
      [monkey]: {
        name: monkey,
        command: command
      }
    }
  }).reduce((a, b) => Object.assign(a, b))
}

function expand(monkeys: Monkeys) {
  Object.values(monkeys)
    .forEach((m, index, orig) => {
      _.without(orig, m).forEach(mm => {
        mm.command = mm.command.replace(m.name, `(${m.command})`)
      })
    })
}

export function partOne(input: string[]): number {
  const monkeys = parseMonkeys(input);
  const root = monkeys['root'];

  expand(monkeys);

  console.log(monkeys['root'].command);
  return eval(monkeys['root'].command);
}

export function partTwo(input: string[]): number {
  const monkeys = parseMonkeys(input);
  const root = monkeys['root'];
  root.command = root.command.replace('+', '==');
  const human = monkeys['humn']
  human.command = 'humn'

  expand(monkeys);

  // for(let i = 0; i < 100000000000; i++) {
  //   const result = eval(root.command.replace('humn', i.toString()))
  //   if(result) {
  //     return i;
  //   }
  // }

  let left: BigInt | undefined = undefined;
  let right: BigInt | undefined = undefined;
  let [leftCommand, rightCommand] = root.command.split('==')
  try {
    left = eval(leftCommand)
  } catch(e) {}
  try {
    right = eval(rightCommand)
  } catch(e) {}
  // console.log(`RIGHT: ${right || rightCommand}`)
  // console.log(`LEFT: ${left || leftCommand}`)

  let found = true;
  while(found) {
    const regex = /\(\d+\)[\+\-\*\/]\(\d+\)/g;
    const result = regex.exec(leftCommand);
    if(result) {
      leftCommand = leftCommand.replaceAll(result[0], eval(result[0]))
    } else {
      found = false;
    }
  }

  console.log(`Reduced left: ${leftCommand}`);
  console.log(`Right: ${right}`);

  // const regex = new RegExp('(\\(\\d+\\)[\\+\\-\\*\\/]\\(\\d+\\))', 'g');
  // const regex = /\(\d+\)[\+\-\*\/]\(\d+\)/g;

  // let regexResult = regex.exec(leftCommand);
  // let count = 0;
  // let reduced = leftCommand
  // while(regexResult !== null) {
  //   reduced = reduced.replaceAll(regexResult[0], eval(regexResult[0]))
  //   console.log(reduced)
  //   regexResult = regex.exec(leftCommand)
  //   count++;
  // }
  
  // console.log(count);

  return -1;
}
