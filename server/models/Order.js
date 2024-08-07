const { Schema, model, SchemaTypes } = require("mongoose");

const orderSchema = new Schema({
   products: [
      {
         product: {
            type: SchemaTypes.ObjectId,
            required: true,
         },
         quantity: {
            type: Number,
            required: true,
         },
         status: {
            type: String,
            required: true,
         },
         timeBook: {
            type: String,
            required: true,
         },
         user: {
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
         },
      },
   ],
});

module.exports = model("Order", orderSchema, "order-asm3");
