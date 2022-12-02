import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();

function partOne() {
  const everyCalories = inputString.split('\n\n');
  const elves = everyCalories.map((calories) => calories.split('\n'));
  let max = 0;
  elves.forEach((arr) => {
    const sum = arr.reduce((acc, cur) => acc + parseInt(cur, 10), 0);
    max = Math.max(sum, max);
  });
  return max;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const everyCalories = inputString.split('\n\n');
  const elves = everyCalories.map((calories) => calories.split('\n'));
  const elvesCalories = elves.map((arr) => arr.reduce((acc, cur) => acc + parseInt(cur, 10), 0));
  elvesCalories.sort().reverse();
  return elvesCalories[0] + elvesCalories[1] + elvesCalories[2];
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
