# staylow
A Node.JS module with custom prompt and log functions, mainly intended for CLI chat applications. User input won't be interrupted by asynchronous messages received and logged in the terminal.

## Init
```
const sl = require('staylow');
sl.defaultPrompt('> '); // set default prompt
```

## Prompt
Normal prompt:
```
sl.prompt('Say hi: ', res => {
  //user input will be visible
});
```
Masked prompt:
```
sl.prompt('Say hi: ', true, res => {
  //user input will be masked with '*'
});
```
## Log
Always use the staylow log method instead of console.log to output to terminal. This insures that any active user prompts won't be interrupted.
```
sl.log('Hello world');
```
