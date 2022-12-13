import _, { add } from "lodash";
/*
[
  [
    6,
    2,
    [2,[10,10,0],[2]],7]]
[
  [
    7,
    9
  ],[5,[8,[0,5,5,10,4],6,8,6],3,[4],2],[4]]
*/
function correctOrder(left: any, right: any): boolean | null {
  if (typeof left === 'number' && typeof right === 'number') {
    if (left < right) {
      return true;
    } else if (left === right) {
      return null;
    } else {
      return false;
    }
  } else if (Array.isArray(left) && Array.isArray(right)) {
    for (let i = 0; i < left.length; i++) {
      if (right[i] === undefined) {
        return false;
      }
      const correct = correctOrder(left[i], right[i])
      if (correct) {
        return true;
      } else if (correct === null) {
        continue;
      } else {
        return false;
      }
    }
    if(right.length > left.length) {
      return true;
    }
    return null;
  } else if (Array.isArray(left) && typeof right === 'number') {
    return correctOrder(left, [right])
  } else if (typeof left === 'number' && Array.isArray(right)) {
    return correctOrder([left], right);
  }
  return null;
}

export function partOne(input: string[]) {
  const correctIndexes: number[] = [];

  let index = 1;
  for (let i = 0; i < input.length; i += 2) {
    const left = eval(input[i]);
    const right = eval(input[i + 1]);

    const isCorrect = correctOrder(left, right);
    console.log(`Left: ${JSON.stringify(left)}, Right: ${JSON.stringify(right)} are correct: ${isCorrect}`)
    if (isCorrect) {
      correctIndexes.push(index);
    }
    index++;
  }

  return _.sum(correctIndexes);
}


export function partTwo(input: string[]) {
  const sorted: string[] = ['[[2]]', '[[6]]'];
  for(let i = 0; i < input.length; i++) {
    const current = input[i];
    let added = false;
    for(let j = 0; j < sorted.length; j++) {
      const isLessThan = correctOrder(eval(current), eval(sorted[j]));
      if(isLessThan) {
        sorted.splice(j, 0, current);
        added = true;
        break;
      }
    }
    if(!added) {
      sorted.push(current);
    }
  }

  const two = sorted.indexOf('[[2]]') + 1
  const six = sorted.indexOf('[[6]]') + 1;

  return two * six
}
