const { validationResult } = require("express-validator");
const Product = require("../models/Product");

exports.getProducts = async (req, res, next) => {
   console.log("VAO GETPRODUCTS");
   const products = await Product.find({});
   if (products.length === 0) {
      next(new Error("khong co san pham"));
   }
   return res.status(200).send(products);
};
exports.getProduct = async (req, res, next) => {
   console.log("VAO DETAIL PROD!");
   const prodId = req.params.id;
   const product = await Product.findById(prodId);
   if (!product) {
      next(new Error("not found product"));
   }
   return res.status(200).send(product);
};
exports.getPaginationProduct = async (req, res, next) => {
   const result = validationResult(req);
   if (!result.isEmpty()) {
      next(new Error(result.array()[0]));
   }
   const { page, count, search, category } = req.query;
   let query = {};
   if (search.length !== 0) {
      query.name = new RegExp(search, "i");
   }
   if (category !== "all") {
      query.category = category;
   }
   const products = await Product.find(query)
      .skip((Number(page) - 1) * Number(count))
      .limit(Number(count))
      .exec();
   if (products.length === 0) {
      next(new Error("not found products"));
   }
   return res.status(200).send(products);
};
