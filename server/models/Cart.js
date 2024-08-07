const { SchemaTypes, model, Schema } = require("mongoose");

const cartSchema = new Schema({
   userId: {
      type: SchemaTypes.ObjectId,
      required: true,
   },
   product: [
      {
         productId: {
            type: SchemaTypes.ObjectId,
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

module.exports = model("Cart", cartSchema, "cart-asm3");
