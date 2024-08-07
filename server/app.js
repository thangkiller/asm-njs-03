//import package
require("dotenv").config();
const express = require("express");
const { createServer } = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const { Server } = require("socket.io");

//import local file in project
const userRoutes = require("./routes/user");
const colorize = require("./util/colorize");
const { isLogin, isCounselorsOrAdmin, isAdmin } = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const chatRoomRoutes = require("./routes/chatRoom");
const loginAdmin = require("./middleware/loginAdmin");

//biến môi trường
const DOMAIN_ACCESS =
   process.env.DOMAIN_ACCESS.split(" ").length === 1 ? process.env.DOMAIN_ACCESS : process.env.DOMAIN_ACCESS.split(" ");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
   cors: {
      origin: (origin, callback) => {
         if (Array.isArray(DOMAIN_ACCESS)) {
            if (DOMAIN_ACCESS.indexOf(origin) !== -1) {
               callback(null, true);
            } else {
               callback(new Error("Not allowed by CORS"));
            }
            return;
         }
         if (origin === "http://localhost:3000" || DOMAIN_ACCESS === origin) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
         return;
      },
   },
});
// const server = http.Server(app);
// const io = socketIo(server);
//configurage
const store = new MongoDBStore({
   uri: process.env.MONGODB_URI,
   collection: "session-asm3",
});

app.use(
   cors({
      origin: (origin, callback) => {
         if (Array.isArray(DOMAIN_ACCESS)) {
            if (DOMAIN_ACCESS.indexOf(origin) !== -1) {
               callback(null, true);
            } else {
               callback(new Error("Not allowed by CORS"));
            }
            return;
         }
         if (origin === "http://localhost:3000" || DOMAIN_ACCESS === origin) {
            callback(null, true);
         } else {
            callback(new Error("Not allowed by CORS"));
         }
         return;
      },
      credentials: true,
   })
);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
   session({
      secret: "this is secret",
      store,
      cookie: {
         maxAge: 1000 * 60 * 60 * 24,
      },
      resave: true,
      saveUninitialized: true,
   })
);
//middleware
app.use(productRoutes);
app.use(authRoutes);
app.use(loginAdmin);
app.use(isLogin, userRoutes, chatRoomRoutes);
app.use(isCounselorsOrAdmin);
app.use(isAdmin);
app.use(errorHandler);

//socket.io
const socketEvents = (socket) => {};

io.on("connection", (socket) => {
   console.log("user connected!");

   const startChat = (req) => {
      console.log("vao start chat");
      socket.join(req.roomId);
   };

   const onMessage = (req) => {
      console.log("req: ", req);
      io.to(req.roomId).emit("server_send_message", req);
   };

   //list event
   socket.on("start_chat", startChat);
   socket.on("client_send_message", onMessage);
   socket.on("disconnect", (reason) => {
      console.log("user disconnected!");
   });
});

//run host

const run = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);
      httpServer.listen(process.env.PORT || 5000);
      console.log(colorize(`\napp is running on http://localhost:${process.env.PORT || 5000}\n`).green);
      store.on("error", function (err) {
         console.log(err);
      });
   } catch (error) {
      console.log("🚀 ~ run ~ error:\n", error);
   }
};

run();
