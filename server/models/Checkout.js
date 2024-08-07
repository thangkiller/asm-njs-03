const mongoose = require("mongoose");

const checkoutSchema = new mongoose.Schema({
   userId: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
   },
   fullname: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   phone: {
      type: Number,
      required: true,
   },
   address: {
      type: String,
      required: true,
   },
   products: [
      {
         product: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "Product",
         },
         count: {
            type: Number,
            required: true,
         },
      },
   ],
});

module.exports = mongoose.model("Checkout", checkoutSchema, "checkout-asm3");
