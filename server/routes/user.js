const express = require("express");
const { body } = require("express-validator");
const {
   getUser,
   getCart,
   postAddToCart,
   deleteToCart,
   putToCart,
   postCheckout,
   getHistories,
   getDetailHistory,
} = require("../controllers/user");

const routes = express.Router();

routes.get("/users/:userId", getUser);
routes.get("/cart", getCart);
routes.post("/cart/add", postAddToCart);
routes.delete("/cart/delete", deleteToCart);
routes.put("/cart/update", putToCart);
routes.post(
   "/email",
   [
      body("to").notEmpty().isEmail(),
      body("phone").notEmpty().isMobilePhone(),
      body("fullname").notEmpty(),
      body("address").notEmpty(),
   ],
   postCheckout
);
routes.get("/histories", getHistories);
routes.get("/histories/:id", getDetailHistory);
module.exports = routes;
