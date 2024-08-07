const { Schema, model } = require("mongoose");

const userSchema = new Schema({
   username: {
      type: String,
   },
   email: {
      type: String,
      required: true,
   },
   passwordHash: {
      type: String,
      required: true,
   },
   phone: {
      type: Number,
      required: true,
   },
   role: {
      type: String,
      required: true,
   },
   // client or counselors or admin
});

module.exports = model("User", userSchema, "user-asm3");
