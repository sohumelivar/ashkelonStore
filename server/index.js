require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const sequelize = require("./db");
const router = require("./routes");
const http = require("http");
const { Message, Unread} = require("./models/models");
const getAllMessagesInChat = require("./api/messageApi");
const { log } = require("console");
const { ifError } = require("assert");

const PORT = process.env.PORT;

const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

app.use(express.json({ extended: true }));
app.use(cookieParser());

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api", router);

const userSockets = {};


io.on("connection", (socket) => {
  socket.on('userId', (data) => {
    userSockets[data.autorizedUser] = socket.id;
  })
  
  socket.on('messages', async (data) => {
    try {
      const allMessages = (await getAllMessagesInChat(data.autorizedUser, data.id))?.sort((a, b) => a.id - b.id);
        socket.emit('messages', allMessages)
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ socket.on ☢ error:', error);
    }
  })
  
  socket.on('sendMessage', async (data) => {
    try {
      await Message.create({
        message: data.message,
        from: data.autorizedUser, 
        to: data.id, 
        chatId: data.chatId, 
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      });
      const unreadMessage = await Unread.findOne({where: {userId: data.id, from: data.autorizedUser}});
      if (unreadMessage) {
        const { counter } = unreadMessage.dataValues;
        console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ socket.on ☢ counter:', counter)
  
        await Unread.update({counter: counter + 1},{where: {userId: data.id, from: data.autorizedUser}});
      } else {
        await Unread.create({counter: 1, userId: data.id, from: data.autorizedUser});
      }
      io.emit('newMessage');
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ socket.on ☢ error:', error);
    }
  })

  socket.on('clearUnreadMessage', async (data) => {
    try {
      const unreadMessage = await Unread.findOne({where: {userId: data.autorizedUser, from: data.id}});
      if (unreadMessage) {
        await Unread.update({counter: 0},{where: {userId: data.autorizedUser, from: data.id}});
      };
      io.emit('getUnreadMessages');
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ socket.on ☢ error:', error);
    }
  })
  
  socket.on('disconnect', () => {
    const userId = Object.keys(userSockets).find(key => userSockets[key] === socket.id);
    delete userSockets[userId];
  });

  socket.on('getUnreadMessages', async (data) => {
    try {
      const unreadMessage = await Unread.findAll({where: {userId: data.autorizedUser}});
      if(unreadMessage) {
        const counter = unreadMessage.map( el => el.dataValues).reduce((acc, el) => el.counter + acc, 0);
        return io.emit('newMessageCounter', counter);
    }
    io.emit('newMessageCounter', null);
    } catch (error) {
      console.log('⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ socket.on ☢ error:', error);
    }
  })
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    server.listen(PORT, () => console.log(`server started on port: ${PORT}`));
  } catch (error) {
    console.log("⚛ --- ⚛ --- ⚛ --- ⚛ ---  >>> ☢ start ☢ error:", error);
  }
};

start();
