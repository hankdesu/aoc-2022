import fs from 'fs/promises';

const inputBuffer = await fs.readFile('input.txt');
const inputString = inputBuffer.toString();
const terminalOutput = inputString.split('\n');

class Terminal {
  constructor({ output }) {
    this.commandHistory = [];
    this.output = output;
    this.path = [];
    this.directory = {};
    this.action = '';
  }

  detectCommandLine(line) {
    this.action = 'detectCommandLine';
    const regex = /^\$ (cd|ls) ?(.+)?/;
    const match = line.match(regex);
    return match;
  }

  detectFileInfo(line) {
    this.action = 'detectFileInfo';
    const regex = /^(\d+) \w+/;
    const match = line.match(regex);
    return match;
  }

  recordCommandHistory(line) {
    this.commandHistory.push(line);
  }

  parseCommandLine() {
    this.output.forEach((line) => {
      const command = this.detectCommandLine(line);
      const fileInfo = this.detectFileInfo(line);
      if (command && command[1] === 'cd') {
        if (command[2] === '..') {
          this.path.pop();
        } else {
          this.path.push(command[2]);
        }
      }
      if (fileInfo) {
        let keyPath = '';
        this.path.forEach((value) => {
          keyPath += value;
          if (!this.directory[keyPath]) {
            this.directory[keyPath] = Number(fileInfo[1]);
          } else {
            this.directory[keyPath] += Number(fileInfo[1]);
          }
        });
      }
    });
  }
}

function partOne() {
  const terminal = new Terminal({ output: terminalOutput });
  terminal.parseCommandLine();
  const { directory } = terminal;
  const totalSize = Object.keys(directory).reduce((acc, cur) => {
    const currentSize = directory[cur];
    if (currentSize <= 100000) {
      return acc + currentSize;
    }
    return acc;
  }, 0);
  return totalSize;
}

const partOneAns = partOne();
console.log('partOneAns: ', partOneAns);

function partTwo() {
  const terminal = new Terminal({ output: terminalOutput });
  terminal.parseCommandLine();
  const { directory } = terminal;
  const TOTAL_SPACE = 70000000;
  const UPDATE_SPACE = 30000000;
  const unusedSpace = TOTAL_SPACE - directory['/'];
  const lessSpace = UPDATE_SPACE - unusedSpace;
  let minimalDirectorySize = Number.MAX_SAFE_INTEGER;
  Object.keys(directory).forEach((value) => {
    const currentSize = directory[value];
    if (currentSize >= lessSpace) {
      minimalDirectorySize = Math.min(minimalDirectorySize, currentSize);
    }
  });
  return minimalDirectorySize;
}

const partTwoAns = partTwo();
console.log('partTwoAns: ', partTwoAns);
