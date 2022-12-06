import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const pairs = inputString.split('\n');

function partOne() {
  const fullyContain = pairs.reduce((acc, cur) => {
    const [firstRange, secondRange] = cur.split(',');
    const [firstHead, firstTail] = firstRange.split('-');
    const [secondHead, secondTail] = secondRange.split('-');
    const firstSection = [];
    const secondSection = [];

    for (let index = parseInt(firstHead, 10); index <= parseInt(firstTail, 10); index += 1) {
      firstSection.push(index);
    }
    for (let index = parseInt(secondHead, 10); index <= parseInt(secondTail, 10); index += 1) {
      secondSection.push(index);
    }

    if (firstSection.length > secondSection.length) {
      if (
        secondSection[0] >= firstSection[0]
        && secondSection[secondSection.length - 1] <= firstSection[firstSection.length - 1]
      ) {
        return acc + 1;
      }
    } else if (firstSection.length <= secondSection.length) {
      if (
        firstSection[0] >= secondSection[0]
        && firstSection[firstSection.length - 1] <= secondSection[secondSection.length - 1]
      ) {
        return acc + 1;
      }
    }

    return acc;
  }, 0);
  return fullyContain;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const fullyContain = pairs.reduce((acc, cur) => {
    const [firstRange, secondRange] = cur.split(',');
    const [firstHead, firstTail] = firstRange.split('-');
    const [secondHead, secondTail] = secondRange.split('-');
    const firstSection = [];
    const secondSection = [];

    for (let index = parseInt(firstHead, 10); index <= parseInt(firstTail, 10); index += 1) {
      firstSection.push(index);
    }
    for (let index = parseInt(secondHead, 10); index <= parseInt(secondTail, 10); index += 1) {
      secondSection.push(index);
    }
    const firstHeadIndex = 0;
    const firstTailIndex = firstSection.length - 1;
    const secondHeadIndex = 0;
    const secondTailIndex = secondSection.length - 1;

    if (
      (
        firstSection[firstHeadIndex] >= secondSection[secondHeadIndex]
        && firstSection[firstHeadIndex] <= secondSection[secondTailIndex]
      ) || (
        firstSection[firstTailIndex] <= secondSection[secondTailIndex]
        && firstSection[firstTailIndex] >= secondSection[secondHeadIndex]
      ) || (
        secondSection[secondHeadIndex] >= firstSection[firstHeadIndex]
        && secondSection[secondHeadIndex] <= firstSection[firstTailIndex]
      ) || (
        secondSection[secondTailIndex] <= firstSection[firstTailIndex]
        && secondSection[secondTailIndex] >= firstSection[firstHeadIndex]
      )
    ) {
      return acc + 1;
    }

    return acc;
  }, 0);
  return fullyContain;
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
