const { Schema, model } = require("mongoose");

const sessionSchema = new Schema({
   sessionId: {
      type: String,
      required: true,
   },
});

module.exports = model(
   "Session",
   sessionSchema,
   "session-asm3"
);
