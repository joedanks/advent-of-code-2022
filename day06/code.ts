import _ from "lodash";

export function partOne(input: string) {
  const buffer: string[] = [];
  
  return input.split('').map((char, index) => {
    if (buffer.length === 4) {
      buffer.shift();
    }
    buffer.push(char);

    if (_.uniq(buffer).length === 4) {
      return index + 1;
    } else {
      return undefined;
    }
  }).find(x => !!x)
}

export function partTwo(input: string) {
  const buffer: string[] = [];
  
  return input.split('').map((char, index) => {
    if (buffer.length === 14) {
      buffer.shift();
    }
    buffer.push(char);

    if (_.uniq(buffer).length === 14) {
      return index + 1;
    } else {
      return undefined;
    }
  }).find(x => !!x)
}
