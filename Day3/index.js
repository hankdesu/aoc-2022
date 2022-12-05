import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const rucksacks = inputString.split('\n');

function addCharNumber(acc, cur) {
  let priority = 0;
  if (cur.toUpperCase() === cur) {
    priority = cur.charCodeAt() - 65 + 27;
  } else {
    priority = cur.charCodeAt() - 97 + 1;
  }
  return acc + priority;
}

function partOne() {
  const totalPriorities = rucksacks
    .map((rucksack) => {
      const middle = rucksack.length / 2;
      const firstCompartment = rucksack.substring(0, middle);
      const secondCompartment = rucksack.substring(middle);
      const firstCharMap = new Map();
      const secondCharMap = new Map();

      for (let index = 0; index < firstCompartment.length; index += 1) {
        const firstCompartmentChar = firstCompartment[index];
        const secondCompartmentChar = secondCompartment[index];

        if (firstCompartmentChar === secondCompartmentChar) return firstCompartmentChar;
        if (firstCharMap.get(secondCompartmentChar)) return secondCompartmentChar;
        if (secondCharMap.get(firstCompartmentChar)) return firstCompartmentChar;

        firstCharMap.set(firstCompartmentChar, true);
        secondCharMap.set(secondCompartmentChar, true);
      }
      return '';
    })
    .reduce(addCharNumber, 0);

  return totalPriorities;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const totalPriorities = rucksacks
    .reduce((acc, cur, index) => {
      const newIndex = Math.floor(index / 3);
      if (!acc[newIndex]) {
        acc[newIndex] = [cur];
      } else {
        acc[newIndex].push(cur);
      }
      return acc;
    }, [])
    .map((rucksackGroup) => {
      const [firstRucksack, secondRucksack, thirdRucksack] = rucksackGroup;

      for (let index = 0; index < firstRucksack.length; index += 1) {
        const char = firstRucksack[index];
        if (secondRucksack.indexOf(char) > -1 && thirdRucksack.indexOf(char) > -1) {
          return char;
        }
      }
      return '';
    })
    .reduce(addCharNumber, 0);

  return totalPriorities;
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
