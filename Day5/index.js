import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const lines = inputString.split('\n');
const stacks = [];
let stop = true;
let lineNum = 0;

while (stop) {
  const line = lines[lineNum];
  lineNum += 1;
  if (line === '') {
    stop = false;
    break;
  }
  const arr = line.split('');
  const tolerance = Math.round(line.length / 4);
  const formatArr = [];
  for (let index = 0; index < tolerance; index += 1) {
    const elements = arr.splice(0, 4);
    formatArr.push(elements);
  }
  stacks.push(formatArr);
}
stacks.pop();

const crates = stacks.reverse().reduce((acc, cur) => {
  cur.forEach((arr, index) => {
    if (arr[1] && arr[1] !== ' ') {
      if (acc[index + 1]) {
        acc[index + 1].push(arr[1]);
      } else {
        acc[index + 1] = [arr[1]];
      }
    }
  });
  return acc;
}, {});

const seperateIndex = lines.findIndex((val) => val === '');
const operations = lines.slice(seperateIndex + 1);

function partOne() {
  const newCrates = JSON.parse(JSON.stringify(crates));
  const rearrangedCrates = operations.reduce((acc, cur) => {
    const parseActionRegex = /move (\d+) from (\d+) to (\d+)/g;
    const [, crateNums, sourceStack, targetStack] = parseActionRegex.exec(cur);
    for (let index = 0; index < crateNums; index += 1) {
      const sourceCrate = acc[sourceStack].pop();
      acc[targetStack].push(sourceCrate);
    }
    return acc;
  }, newCrates);
  const topCrates = Object.keys(rearrangedCrates).reduce(
    (acc, cur) => `${acc}${rearrangedCrates[cur].pop()}`,
    '',
  );

  return topCrates;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const newCrates = JSON.parse(JSON.stringify(crates));

  const rearrangedCrates = operations.reduce((acc, cur) => {
    const parseActionRegex = /move (\d+) from (\d+) to (\d+)/g;
    const [, crateNums, sourceStack, targetStack] = parseActionRegex.exec(cur);
    const sourceCrates = acc[sourceStack].splice(acc[sourceStack].length - crateNums, crateNums);
    acc[targetStack].push(...sourceCrates);
    return acc;
  }, newCrates);
  const topCrates = Object.keys(rearrangedCrates).reduce(
    (acc, cur) => `${acc}${rearrangedCrates[cur].pop()}`,
    '',
  );

  return topCrates;
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
