import _ from "lodash";

interface Lookup {
  win: "A" | "B" | "C";
  draw: "A" | "B" | "C";
  lose: "A" | "B" | "C";
}

interface Outcome {
  X: Lookup;
  Y: Lookup;
  Z: Lookup;
}

const outcome: Outcome = {
  X: {
    win: "C",
    draw: "A",
    lose: "B",
  },
  Y: {
    win: "A",
    draw: "B",
    lose: "C",
  },
  Z: {
    win: "B",
    draw: "C",
    lose: "A",
  },
};

function myPoints(opponent: string, me: string) {
  return (
    Object.entries(outcome[me])
      .filter(([key, value]) => {
        return value === opponent;
      })
      .map(([key, value]) => key)
      .map((outcome) => {
        switch (outcome) {
          case "win":
            return 6;
          case "draw":
            return 3;
          case "lose":
            return 0;
        }
      })[0] || 0
  );
}

function bonusPoints(me: string) {
  switch (me) {
    case "X":
      return 1;
    case "Y":
      return 2;
    case "Z":
      return 3;
    default:
      return 0;
  }
}

export function partOne(input: string[]) {
  let sumPoints = 0;

  for (let i = 0; i < input.length; i += 2) {
    const opponent = input[i];
    const mine = input[i + 1];
    const points = myPoints(opponent, mine);
    const totalPoints = points + bonusPoints(mine);

    sumPoints += totalPoints;
  }

  return sumPoints;
}

function pickMine(result: string, opponent: string) {
  switch (result) {
    case "X":
      return Object.entries(outcome)
        .filter(([mine, lookup]) => {
          return lookup.lose === opponent;
        })
        .map(([mine, lookup]) => mine)[0];
    case "Y":
      return Object.entries(outcome)
        .filter(([mine, lookup]) => {
          return lookup.draw === opponent;
        })
        .map(([mine, lookup]) => mine)[0];
    case "Z":
      return Object.entries(outcome)
        .filter(([mine, lookup]) => {
          return lookup.win === opponent;
        })
        .map(([mine, lookup]) => mine)[0];
  }
}

export function partTwo(input: string[]) {
  let sumPoints = 0;

  for (let i = 0; i < input.length; i += 2) {
    const opponent = input[i];
    const desiredOutcome = input[i + 1];
    const mine = pickMine(desiredOutcome, opponent);
    const points = myPoints(opponent, mine!);
    const totalPoints = points + bonusPoints(mine!);

    sumPoints += totalPoints;
  }

  return sumPoints;
}
