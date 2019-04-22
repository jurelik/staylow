const readline = require('readline');

let buffer = []; //Buffer of pressed keys
let promptActive = false; //Is a prompt active?

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Keep track of pressed keys
process.stdin.on('keypress', (val, key) => {
  if(key.name === 'backspace') {
    if (buffer.length > 1) {
      buffer.pop();
    }
  }
  else if(val === '\r') {
    if (!promptActive) {
      buffer = [];
    }
    else {
      promptActive = false;
    }
  }
  else if (key.name != 'backspace' && val != '\r') {
    buffer.push(val)
  }
});

//Custom log function
exports.log = function(text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(text);
  process.stdout.write(buffer.join(''));
};

//Custom prompt function
exports.prompt = function(q, callback) {
  if (q === '') {
    q = '> ';
  }
  buffer.unshift(q);
  rl.question(q, (res) => {
    promptActive = true;
    buffer = [];
    callback(res);
  });
};

