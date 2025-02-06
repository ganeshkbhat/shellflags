const fs = require('fs');
const path = require('path');

function parseCommandLineArguments(prefixDefinitions) {
  const args = process.argv.slice(2); // Remove node and script path
  const options = {};

  prefixDefinitions.forEach(definition => {
    const { prefix, handler } = definition;
    // const prefixRegex = new RegExp(`^${prefix}(?:=(?:(["'])(.*?)\2|([^"']+)))?$`); 
    const prefixRegex = new RegExp(`^${prefix}(?:=(?:(["'])(.*?)\\u0002|([^"']+)))?$`);

    args.forEach(arg => {
      const match = arg.match(prefixRegex);

      if (match) {
        const value = match[3] !== undefined ? match[3] : match[2];
        options[prefix] = value;

        if (typeof handler === 'function') {
          handler(value);
        } else if (typeof handler === 'string') {
          // Attempt to invoke as a global function
          if (typeof global[handler] === 'function') {
            global[handler](value);
          } else {
            // Attempt to load and invoke from a file
            try {
              const handlerPath = path.join(process.cwd(), handler);
              const handlerModule = require(handlerPath);
              if (typeof handlerModule.default === 'function') {
                handlerModule.default(value);
              } else {
                console.error(`Exported default from '${handlerPath}' is not a function.`);
              }
            } catch (error) {
              console.error(`Error loading handler from '${handlerPath}':`, error);
            }
          }
        } else {
          console.error(`Handler for prefix '${prefix}' is invalid.`);
        }
      }
    });
  });

  return options;
}

function parseCommandLineArguments(prefixDefinitions) {
  prefixDefinitions.forEach(function (v) {
    if (!v.prefix.startsWith("-")) {
      console.error("prefix has to start with - or -- : prefix: ", v.prefix);
      throw new Error("prefix has to start with - or --");
    }
  });
  const args = process.argv.slice(2); // Remove node and script path
  const options = {};

  prefixDefinitions.forEach(definition => {
    const { prefix, handler } = definition;
    // const prefixRegex = new RegExp(`^${prefix}(?:=(?:(["'])(.*?)\2|([^"']+)))?$`); 
    const prefixRegex = new RegExp(`^${prefix}(?:=(?:(["'])(.*?)\\u0002|([^"']+)))?$`);

    args.forEach(arg => {
      const match = arg.match(prefixRegex);
      // console.log("match: ", match);

      if (match) {
        const value = (match[0] !== undefined || match[0] !== null) ? (!!args[args.indexOf(match[0]) + 1] && (!args[args.indexOf(match[0]) + 1].startsWith("-"))) ? args[args.indexOf(match[0]) + 1] : !!args[args.indexOf(match[0])] : !!args[args.indexOf(match[0])];
        // console.log("value: ", value);
        options[prefix] = value;

        if (typeof handler === 'function') {
          handler(value);
        } else if (typeof handler === 'string') {
          // Attempt to invoke as a global function
          if (typeof global[handler] === 'function') {
            global[handler](value);
          } else {
            // Attempt to load and invoke from a file
            try {
              const handlerPath = path.join(process.cwd(), handler);
              // console.log("handlerPath, value: ", handlerPath, value);
              const handlerModule = require(handlerPath);
              if (typeof handlerModule.default === 'function') {
                handlerModule.default(value);
              } else if (typeof handlerModule === 'function') {
                handlerModule(value);
              } else {
                console.error(`Exported default from '${handlerPath}' is not a function.`);
              }
            } catch (error) {
              console.error(`Error loading handler from '${handlerPath}':`, error);
            }
          }
        } else {
          console.error(`Handler for prefix '${prefix}' is invalid.`);
        }
      }
    });
  });

  return options;
}

module.exports = parseCommandLineArguments;
