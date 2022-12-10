import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const datastreamLength = inputString.length;

function partOne() {
  for (let index = 0; index <= datastreamLength - 4; index += 1) {
    const charMap = new Map();
    let repeat = false;
    for (let j = 0; j < 4; j += 1) {
      const char = inputString[index + j];
      if (charMap.get(char)) {
        repeat = true;
        break;
      }
      charMap.set(char, true);
    }
    if (repeat === false) return index + 4;
  }
  return '';
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  for (let index = 0; index <= datastreamLength - 14; index += 1) {
    const charMap = new Map();
    let repeat = false;
    for (let j = 0; j < 14; j += 1) {
      const char = inputString[index + j];
      if (charMap.get(char)) {
        repeat = true;
        break;
      }
      charMap.set(char, true);
    }
    if (repeat === false) return index + 14;
  }
  return '';
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
