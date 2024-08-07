const express = require("express");
const { body } = require("express-validator");

const { getMessageByRoomId, postCreateNewRoom, putAddMessage, getAllRoom } = require("../controllers/chatRoom");

const routes = express.Router();

routes.get("/chatrooms/getById", getMessageByRoomId);
routes.get("/chatrooms/getAllRoom", getAllRoom);
routes.post("/chatrooms/createNewRoom", postCreateNewRoom);
routes.put(
   "/chatrooms/addMessage",
   [body("roomId").notEmpty(), body("message").notEmpty(), body("is_admin").notEmpty()],
   putAddMessage
);

module.exports = routes;
