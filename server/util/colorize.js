const colorize = (...args) => ({
   green: `\x1b[32m${args.join(" ")}`,
   red: `\x1b[31m${args.join(" ")}`,
});

module.exports = colorize;
