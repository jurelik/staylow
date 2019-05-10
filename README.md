# staylow
A Node.JS module with custom prompt and log functions, mainly intended for CLI chat applications. User input won't be interrupted by asynchronous messages received and logged in the terminal.

## Init
```
const sl = require('staylow');
sl.defaultPrompt('> '); // set defaultPrompt
sl.setMask('*'); // set the mask used for muted input (defaults to '*');
```

## Prompt
Normal prompt:
```
sl.prompt('Say hi: ', res => {
  //user input will be visible
});

sl.prompt('', res => {
  //in this case the prompt will default to defaultPrompt
});
```
Masked prompt:
```
sl.prompt('Say hi: ', true, res => {
  //user input will be masked with '*'
});
```
Saving history:
```
//By default, user entries won't be saved to the entry history
//To save manually, use the following:
sl.addToHistory('String you want to save');
```
## Log
Always use the staylow log method instead of console.log to output to terminal. This insures that any active user prompts won't be interrupted.
```
sl.log('Hello world');
```
