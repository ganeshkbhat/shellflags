
const parseCommandLineArguments = require("../index");

function handlePort(port) {
  console.log(`Starting server on port: ${port}`);
  // ... your server logic ...
}

var prefixDefinitions = [
  { prefix: "-p", handler: "portHandler" }, // Use string for handler path
  { prefix: "--port", handler: handlePort }, // Use function directly
];

parseCommandLineArguments(prefixDefinitions);

// // main.js
// const parseCommandLineArguments = require('./argumentParser');

function handleOption3(value) {
  console.log("Value handler3: ", value);
  return `Option 3 handled with value: ${value}`;
}

prefixDefinitions = [
  { prefix: '-o1', handler: './demos/handler1.js' },
  { prefix: '---o2', handler: './demos/handler2.js' },
  { prefix: '-o3', handler: handleOption3 },
];

parseCommandLineArguments(prefixDefinitions);

