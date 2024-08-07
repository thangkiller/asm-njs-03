const mongoose = require("mongoose");

const chatRoomSchema = new mongoose.Schema({
   chat: [
      {
         //id là định danh cho người nhắn tin của đoạn tin nhắn
         id: {
            type: mongoose.Types.ObjectId,
            required: true,
            ref: "User",
         },
         //messages là đoạn tin nhắn của người nhắn
         messages: [
            {
               type: String,
               required: true,
            },
         ],
         is_admin: {
            type: Boolean,
            required: true,
         },
      },
   ],
});

module.exports = mongoose.model("ChatRoom", chatRoomSchema, "chatRoom-asm2");
