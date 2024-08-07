const express = require("express");
const { query } = require("express-validator");

const { getProducts, getProduct, getPaginationProduct } = require("../controllers/product");

const routes = express.Router();

routes.get("/products", getProducts);
routes.get("/product/:id", getProduct);
routes.get(
   "/products/pagination",
   [query("page").notEmpty().isInt(), query("count").notEmpty().isInt()],
   getPaginationProduct
);

module.exports = routes;
