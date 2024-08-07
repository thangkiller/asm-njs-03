const User = require("../models/User");

const loginAdmin =
   ("/users",
   async (req, res, next) => {
      const users = await User.find({});
      if (users.length === 0) {
         next(new Error("user is not exist"));
      }
      const usersRes = users.map((user) => {
         return {
            ...user._doc,
            passwordHash: undefined,
         };
      });
      console.log("🚀 ~ usersRes ~ usersRes:", usersRes);
      console.log("co users!");
      return res.status(200).send(usersRes);
   });

module.exports = loginAdmin;
