import fs from 'fs/promises';

const SCORE_X = 1;
const SCORE_Y = 2;
const SCORE_Z = 3;
const LOST = 0;
const DRAW = 3;
const WIN = 6;

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';

const handShapes = {
  A: ROCK,
  B: PAPER,
  C: SCISSORS,
  X: ROCK,
  Y: PAPER,
  Z: SCISSORS,
};

const outcomes = {
  X: LOST,
  Y: DRAW,
  Z: WIN,
};

const scores = {
  A: SCORE_X,
  B: SCORE_Y,
  C: SCORE_Z,
  X: SCORE_X,
  Y: SCORE_Y,
  Z: SCORE_Z,
  ROCK: SCORE_X,
  PAPER: SCORE_Y,
  SCISSORS: SCORE_Z,
};

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const rounds = inputString.split('\n').map((value) => value.split(' '));

function partOne() {
  const totalScore = rounds.reduce((acc, cur) => {
    const [opponent, self] = cur;
    let currentRoundScore = scores[self];
    if (handShapes[opponent] === handShapes[self]) {
      currentRoundScore += DRAW;
      return acc + currentRoundScore;
    }
    switch (handShapes[opponent]) {
      case ROCK: {
        if (handShapes[self] === PAPER) {
          currentRoundScore += WIN;
        } else if (handShapes[self] === SCISSORS) {
          currentRoundScore += LOST;
        }
        break;
      }
      case SCISSORS: {
        if (handShapes[self] === ROCK) {
          currentRoundScore += WIN;
        } else if (handShapes[self] === PAPER) {
          currentRoundScore += LOST;
        }
        break;
      }
      case PAPER: {
        if (handShapes[self] === ROCK) {
          currentRoundScore += LOST;
        } else if (handShapes[self] === SCISSORS) {
          currentRoundScore += WIN;
        }
        break;
      }
      default:
        break;
    }
    return acc + currentRoundScore;
  }, 0);
  return totalScore;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const totalScore = rounds.reduce((acc, cur) => {
    const [opponent, outcome] = cur;
    let currentRoundScore = 0;

    switch (outcomes[outcome]) {
      case DRAW:
        currentRoundScore = outcomes[outcome] + scores[opponent];
        break;
      case WIN: {
        currentRoundScore = WIN;
        if (handShapes[opponent] === ROCK) {
          currentRoundScore += scores[PAPER];
        } else if (handShapes[opponent] === SCISSORS) {
          currentRoundScore += scores[ROCK];
        } else if (handShapes[opponent] === PAPER) {
          currentRoundScore += scores[SCISSORS];
        }
        break;
      }
      case LOST: {
        currentRoundScore = LOST;
        if (handShapes[opponent] === ROCK) {
          currentRoundScore += scores[SCISSORS];
        } else if (handShapes[opponent] === SCISSORS) {
          currentRoundScore += scores[PAPER];
        } else if (handShapes[opponent] === PAPER) {
          currentRoundScore += scores[ROCK];
        }
        break;
      }
      default:
        break;
    }
    return acc + currentRoundScore;
  }, 0);
  return totalScore;
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
