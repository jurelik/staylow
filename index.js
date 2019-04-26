const readline = require('readline');

let buffer = []; //Buffer of pressed keys
let muted = false; //Is mute active?
let defaultPrompt = '> '; //Default prompt

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

//Keep track of pressed keys
process.stdin.on('keypress', (val, key) => {
  if(key.name === 'backspace' && val != '\r') {
    if (buffer.length > 1) {
      buffer.pop();
      if (muted === true) { //Redraw input on backspace
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write(buffer[0]);
        for (x = 1; x < buffer.length; x++) {
          process.stdout.write('*');
        }
      }
    }
  }
  else if (key.name != 'backspace' && val != '\r') {
    buffer.push(val)
  }
});

//Change the readline logging function
rl._writeToOutput = function _writeToOutput(stringToWrite) {
  if (muted === true) {
    rl.output.write('*');
  }
  else {
    rl.output.write(stringToWrite);
  }
};

//Custom log function
/**
 * @param {string} text
 */
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
/**
 * @param {object} options
 */
exports.prompt = function(options, callback) {
  options = options || {};
  options.question = options.question || defaultPrompt;
  options.mute = options.mute || false;

  //Change the readline question function
  rl.question = function(query, cb) {
    if (typeof cb === 'function') {
      if (rl._questionCallback) {
        rl.prompt();
      } else {
        rl._oldPrompt = rl._prompt;
        rl.setPrompt(query);
        rl._questionCallback = cb;
        rl.prompt();
        //Inject this bit
        if (options.mute) {
          muted = true;
        }
        else {
          muted = false;
        }
        //
      }
    }
  }; 
  buffer.unshift(options.question);
  rl.question(options.question, (res) => {
    //Redraw input on enter
    if (muted === true) {
      process.stdout.clearLine();
      process.stdout.cursorTo(0);
      process.stdout.write(buffer[0]);
      for (x = 1; x < buffer.length; x++) {
        process.stdout.write('*');
      }
      process.stdout.write('\n');
    }
    //Back into default state
    buffer = [];
    muted = false;
    callback(res);
  });
};

//Helper function for changing the value of defaultPrompt
/**
 * @param {string} prompt
 */
exports.defaultPrompt = function(prompt) {
  defaultPrompt = prompt;
};

