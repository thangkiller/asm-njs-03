const colorize = require("../util/colorize");

module.exports = (error, req, res, next) => {
   console.dir(error);
   if (!error) {
      return;
   }
   console.log(colorize("\n", error.stack, "\n").red);
   return res.status(404).send(error);
};
