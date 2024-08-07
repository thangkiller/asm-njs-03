const { validationResult } = require("express-validator");

const ChatRoom = require("../models/ChatRoom");

exports.getMessageByRoomId = async (req, res, next) => {
   console.log("VAO GETMESSAGEBYROOMID");
   const roomId = req.query.roomId;

   console.log("🚀 ~ exports.getMessageByRoomId= ~ roomId:", roomId);
   const room = await ChatRoom.findById(roomId);
   console.log("🚀 ~ exports.getMessageByRoomId= ~ room:", room);
   if (!room) {
      console.log("not found room chat!");
      return next(new Error("not found room chat!"));
   }
   return res.status(200).send(room);
};
exports.getAllRoom = async (req, res, next) => {
   console.log("VAO GETALLROOM");
   const rooms = await ChatRoom.find({});
   if (rooms.length === 0) {
      console.log("has not room chat");
   }
   console.log("🚀 ~ exports.getAllRoom= ~ rooms:", rooms);
   return res.status(200).send(rooms);
};
exports.postCreateNewRoom = async (req, res, next) => {
   console.log("VAO POSTCREATEROOM");
   const userId = req.session.user._id;
   const message = req.body.messages;
   const roomModel = new ChatRoom({});
   const newRoom = await roomModel.save();
   console.log("🚀 ~ exports.postCreateNewRoom= ~ newRoom:", newRoom);
   if (!newRoom) {
      console.log("can not create room");
      return next(new Error("can not create room"));
   }
   return res.status(200).send(newRoom);
};
exports.putAddMessage = async (req, res, next) => {
   console.log("VAO PUTADDMESSAGE");
   const result = validationResult(req);
   if (!result.isEmpty()) {
      console.log("PUTADDMESSAGE not valid");
      return next(new Error("PUTADDMESSAGE not valid"));
   }
   const { message, roomId, is_admin } = req.body;
   console.log("🚀 ~ exports.putAddMessage= ~ message:", req.body);
   const room = await ChatRoom.findById(roomId);
   if (!room) {
      console.log("not found");
      return next(new Error("not found"));
   }
   // lấy id của người nhắn tin cuối cùng là gì
   // nếu trùng với người nhắn mới thì chèn vào người đó nếu không tạo người mới
   const lengthChatRoom = room.chat.length;
   if (lengthChatRoom === 0) {
      room.chat.push({
         id: userId,
         messages: [message],
         is_admin: !(req.session.user.role === "client"),
      });
   }
   const idLast = room.chat[lengthChatRoom - 1].id;
   console.log("🚀 ~ exports.putAddMessage= ~ idLast:", idLast);
   const userId = req.session.user._id;
   if (userId === idLast) {
      console.log("trùng người");
      room.chat[lengthChatRoom - 1].messages.push(message);
   } else {
      console.log("khác người");
      room.chat.push({
         id: userId,
         messages: [message],
         is_admin: !(req.session.user.role === "client"),
      });
   }
   await room.save();
   return res.status(200).send("success");
};
