# shellflags
create shell command line flags, their parsers, and it's appropriate manager easily with a predefined object definition

you can find [demos here](https://github.com/ganeshkbhat/shellflags/tree/main/demos)


run `npm run demo` to run the same demo below

```

const parseCommandLineArguments = require("shellflags");

// do your data modification here
function handlePort(port) {
  console.log(`Starting server on port: ${port}`);
  // ... your server logic ...
  return port;
}

var prefixDefinitions = [
  { prefix: "-p", handler: "./demos/portHandler" }, // Use string for handler path
  { prefix: "--port", handler: handlePort }, // Use function directly
];

console.log("parseCommandLineArguments(prefixDefinitions): ", parseCommandLineArguments(prefixDefinitions));

// // OUTPUT
// Starting server on port: 3443
// parseCommandLineArguments(prefixDefinitions):  { '-p': '3443' }

function handleOption3(value) {
  console.log("Value handler3: ", value);
  return `Option 3 handled with value: ${value}`;
}

prefixDefinitions = [
  { prefix: '-o1', handler: './demos/handler1.js' },
  { prefix: '---o2', handler: './demos/handler2.js' },
  { prefix: '-o3', handler: handleOption3 },
];

console.log("parseCommandLineArguments(prefixDefinitions): ", parseCommandLineArguments(prefixDefinitions));

// // OUTPUT
// Value handler1:  test
// parseCommandLineArguments(prefixDefinitions):  { 'c': 'test' }

```
