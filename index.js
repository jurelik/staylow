const readline = require('readline');

let buffer = []; //Buffer of pressed keys
let promptActive = false; //Is a prompt active?
let muted = false; //Is mute active?

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

//Change the readline logging function
rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (muted === true) {
    rl.output.write("*");
  }
  else {
    rl.output.write(stringToWrite);
  }
};

//Custom log function
exports.log = function(text) {
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  console.log(text);
  if (muted === true) {
    process.stdout.write(buffer[0]);
    for (x = 1; x < buffer.length; x++) {
      process.stdout.write('*');
    }
  }
  else {
    process.stdout.write(buffer.join(''));
  }
};

//Custom prompt function
exports.prompt = function(question, mute, callback) {

  //Change the readline question function
  rl.question = function(query, cb) {
    if (typeof cb === 'function') {
      if (rl._questionCallback) {
        rl.prompt();
      } else {
        rl._oldPrompt = this._prompt;
        rl.setPrompt(query);
        rl._questionCallback = cb;
        rl.prompt();
        //Inject this bit
        if (mute) {
          muted = true;
        }
        //
      }
    }
  }; 
  if (question === '') {
    question = '> ';
  }
  buffer.unshift(question);
  rl.question(question, (res) => {
    promptActive = true;
    buffer = [];
    muted = false;
    callback(res);
  });
}

