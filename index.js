const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});
const lines = [];

rl.on('line', (line) => {
  const middle = line.length / 2;
  lines.push([line.slice(0, middle), line.slice(middle)]);
});

rl.once('close', () => {
  const charToCode = (char) => {
    const code = char.charCodeAt(0);
    if (code >= 97 && code <= 122) {
      return code - 97 + 1;
    }
    if (code >= 65 && code <= 90) {
      return code - 65 + 1 + 26;
    }
    return 0;
  };
  const findSame = ([str1, str2]) => {
    const dict = {};
    for (let i = 0; i < str1.length; ++i) {
      const char1 = str1[i];
      const char2 = str2[i];
      dict[char1] =
        dict[char1] === undefined
          ? [1, 0]
          : [dict[char1][0] + 1, dict[char1][1]];
      dict[char2] =
        dict[char2] === undefined
          ? [0, 1]
          : [dict[char2][0], dict[char2][1] + 1];
      if (dict[char1][0] > 0 && dict[char1][1] > 0) {
        return char1;
      }
      if (dict[char2][0] > 0 && dict[char2][1] > 0) {
        return char2;
      }
    }
    return '?';
  };
  const sum = (a, b) => a + b;

  console.log(lines.map(findSame).map(charToCode).reduce(sum));
});
