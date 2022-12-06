import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const operations = inputString.split('\n');

function partOne() {
  const crates = {
    1: ['N', 'S', 'D', 'C', 'V', 'Q', 'T'],
    2: ['M', 'F', 'V'],
    3: ['F', 'Q', 'W', 'D', 'P', 'N', 'H', 'M'],
    4: ['D', 'Q', 'R', 'T', 'F'],
    5: ['R', 'F', 'M', 'N', 'Q', 'H', 'V', 'B'],
    6: ['C', 'F', 'G', 'N', 'P', 'W', 'Q'],
    7: ['W', 'F', 'R', 'L', 'C', 'T'],
    8: ['T', 'Z', 'N', 'S'],
    9: ['M', 'S', 'D', 'J', 'R', 'Q', 'H', 'N'],
  };
  const rearrangedCrates = operations.reduce((acc, cur) => {
    const parseActionRegex = /move (\d+) from (\d+) to (\d+)/g;
    const [, crateNums, sourceStack, targetStack] = parseActionRegex.exec(cur);
    for (let index = 0; index < crateNums; index += 1) {
      const sourceCrate = acc[sourceStack].pop();
      acc[targetStack].push(sourceCrate);
    }
    return acc;
  }, { ...crates });
  const topCrates = Object.keys(rearrangedCrates).reduce((acc, cur) => `${acc}${rearrangedCrates[cur].pop()}`, '');

  return topCrates;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const crates = {
    1: ['N', 'S', 'D', 'C', 'V', 'Q', 'T'],
    2: ['M', 'F', 'V'],
    3: ['F', 'Q', 'W', 'D', 'P', 'N', 'H', 'M'],
    4: ['D', 'Q', 'R', 'T', 'F'],
    5: ['R', 'F', 'M', 'N', 'Q', 'H', 'V', 'B'],
    6: ['C', 'F', 'G', 'N', 'P', 'W', 'Q'],
    7: ['W', 'F', 'R', 'L', 'C', 'T'],
    8: ['T', 'Z', 'N', 'S'],
    9: ['M', 'S', 'D', 'J', 'R', 'Q', 'H', 'N'],
  };
  const rearrangedCrates = operations.reduce((acc, cur) => {
    const parseActionRegex = /move (\d+) from (\d+) to (\d+)/g;
    const [, crateNums, sourceStack, targetStack] = parseActionRegex.exec(cur);
    const sourceCrates = acc[sourceStack].splice(acc[sourceStack].length - crateNums, crateNums);
    acc[targetStack].push(...sourceCrates);
    return acc;
  }, { ...crates });
  const topCrates = Object.keys(rearrangedCrates).reduce((acc, cur) => `${acc}${rearrangedCrates[cur].pop()}`, '');

  return topCrates;
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
