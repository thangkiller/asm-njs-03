const express = require("express");
const { body } = require("express-validator");

const { postLogin, postSignup } = require("../controllers/auth");

const routes = express.Router();

routes.post(
   "/signup",
   [
      body("email").notEmpty(),
      body("password").notEmpty(),
      body("fullname").notEmpty(),
      body("phone").notEmpty().isMobilePhone(),
   ],
   postSignup
);
routes.post("/login", [body("email").notEmpty(), body("password").notEmpty()], postLogin);

module.exports = routes;
