const User = require("../models/User");
const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");

const saltRounds = 3;

exports.postSignup = async (req, res, next) => {
   const result = validationResult(req);
   if (!result.isEmpty()) {
      next(new Error(result.array()[0]));
   }
   const body = req.body;
   //hash password for user registered
   const passwordHash = bcrypt.hashSync(body.password, saltRounds);
   //database
   await User.create({
      email: body.email,
      username: body.fullname,
      phone: body.phone,
      passwordHash,
   });
   return res.status(200).send({ message: "thanh cong" });
};
exports.postLogin = async (req, res, next) => {
   const result = validationResult(req);
   if (!result.isEmpty()) {
      return next(new Error(result.array()[0]));
   }
   const body = req.body;
   console.log("body ", body);
   //get user through email
   const user = await User.findOne({
      email: body.email,
   });
   console.log("🚀 ~ exports.postLogin= ~ user:", user);
   if (!user) {
      next(new Error("user is not exist"));
   }
   console.log("passwordHash ", user.passwordHash);
   // compare password with hash
   bcrypt.compare(body.password, user.passwordHash, function (err, result) {
      if (err) {
         next(err);
      }
      if (result === false) {
         next(new Error("đăng nhập that bai"));
      }
      const {
         _doc: { passwordHash, ...currentUser },
      } = user;
      console.log("thanh cong dang nhap", currentUser);

      //create session
      req.session.user = currentUser;
      req.session.isLogin = true;
      return res.status(200).send(currentUser);
   });
};
