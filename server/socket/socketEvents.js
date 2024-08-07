const socketEvents = (socket) => {
   const startChat = (req) => {
      console.log("vao start chat");
      socket.join(req.roomId);
   };
   const onMessage = (req) => {
      console.log("req: ", req);
   };

   //list event
   socket.on("start_chat", startChat);
   socket.on("client_send_message", onMessage);
};

module.exports = socketEvents;
