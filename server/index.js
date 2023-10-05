require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const path = require("path");
const sequelize = require("./db");
const router = require("./routes");
const http = require("http");
const { Message } = require("./models/models");
const getAllMessagesInChat = require("./api/messageApi");

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

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.emit("connection", "Привет, клиент!");
  socket.on("chatHistory", async (data) => {
    try {
      console.log(data);
      // if(data){
      //   await
      // }
      const allMessagesBetweenUsers = await getAllMessagesInChat(2, 3);
      socket.emit("chatHistory", allMessagesBetweenUsers);
    } catch (error) {
      console.log(error);
    }
  });
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
