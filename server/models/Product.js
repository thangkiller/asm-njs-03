const { Schema, model } = require("mongoose");

const productSchema = new Schema({
   category: {
      type: String,
      required: true,
   },
   name: {
      type: String,
      required: true,
   },
   price: {
      type: Number,
      required: true,
   },
   img1: {
      type: String,
      required: true,
   },
   img2: {
      type: String,
      required: true,
   },
   img3: {
      type: String,
      required: true,
   },
   img4: {
      type: String,
      required: true,
   },
   long_desc: {
      type: String,
   },
   short_desc: {
      type: String,
   },
});

module.exports = model(
   "Product",
   productSchema,
   "product-asm3"
);
