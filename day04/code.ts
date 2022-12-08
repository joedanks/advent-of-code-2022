import _ from "lodash";

export function partOne(input: string[]) {
  let fullyContained = 0;

  for (let i = 0; i < input.length; i += 2) {
    const first = input[i];
    const second = input[i + 1];

    const [firstOne, firstTwo] = first.split('-');
    const [secondOne, secondTwo] = second.split('-');

    if (Number.parseInt(firstOne, 10) <= Number.parseInt(secondOne, 10)
      && Number.parseInt(firstTwo, 10) >= Number.parseInt(secondTwo, 10)) {
      fullyContained++;
    } else if (Number.parseInt(firstOne, 10) >= Number.parseInt(secondOne, 10)
      && Number.parseInt(firstTwo, 10) <= Number.parseInt(secondTwo, 10)) {
      fullyContained++;
    }
  }

  return fullyContained;
}

export function partTwo(input: string[]) {
  let overlap = 0;

  for (let i = 0; i < input.length; i += 2) {
    const first = input[i];
    const second = input[i + 1];

    const [firstOne, firstTwo] = first.split('-');
    const [secondOne, secondTwo] = second.split('-');

    if (Number.parseInt(firstOne, 10) <= Number.parseInt(secondOne, 10)
      && Number.parseInt(firstTwo, 10) >= Number.parseInt(secondTwo, 10)) {
      overlap++;
    } else if (Number.parseInt(firstOne, 10) >= Number.parseInt(secondOne, 10)
      && Number.parseInt(firstTwo, 10) <= Number.parseInt(secondTwo, 10)) {
      overlap++;
    } else if (Number.parseInt(firstOne, 10) <= Number.parseInt(secondOne, 10)
      && Number.parseInt(firstTwo, 10) >= Number.parseInt(secondOne, 10)) {
      overlap++;
    } else if (Number.parseInt(firstOne, 10) <= Number.parseInt(secondTwo, 10)
      && Number.parseInt(firstTwo, 10) >= Number.parseInt(secondTwo, 10)) {
      overlap++;
    }
  }

  return overlap;
}
