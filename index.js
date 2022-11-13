const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
// const helmet = require("helmet");
const morgan = require("morgan");
const multer = require("multer");
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");
const conversationRoute = require("./routes/conversations");
const messageRoute = require("./routes/messages");
const onlineRoute = require("./routes/onlines");
const commentRoute = require("./routes/comment");
const statusRoute = require("./routes/status");
const router = express.Router();
const path = require("path");
const cors = require("cors");

const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "DELETE", "PUT"],
  },
});

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use(cors());

//middleware
app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/connect/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploded successfully");
  } catch (error) {
    console.error(error);
  }
});

app.use("/connect/auth", authRoute);
app.use("/connect/users", userRoute);
app.use("/connect/posts", postRoute);
app.use("/connect/conversations", conversationRoute);
app.use("/connect/messages", messageRoute);
app.use("/connect/onlines", onlineRoute);
app.use("/connect/comment", commentRoute);
app.use("/connect/status", statusRoute);

app.use(express.static(path.join(__dirname, "/react-social/build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/react-social/build", "index.html"));
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  //when ceonnect
  console.log("a user connected.");

  //take userId and socketId from user
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    io.emit("getUsers", users);
  });

  //send and get message
  socket.on("sendMessage", ({ senderId, receiverId, text }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderId,
      text,
    });
  });

  socket.on("sendNotification", ({ senderName, receiverId, type, message }) => {
    const receiver = getUser(receiverId);
    if (type !== "3") {
      io.to(receiver.socketId).emit("getNotification", { senderName, type });
    } else {
      io.to(receiver.socketId).emit("getNotification", {
        senderName,
        type,
        message,
      });
    }
  });
  socket.on("sendText", ({ senderName, receiverName, text }) => {
    const receiver = getUser(receiverName);
    io.to(receiver.socketId).emit("getText", {
      senderName,
      text,
    });
  });

  //when disconnect
  socket.on("disconnect", () => {
    // localStorage.setItem("onlineUsers", JSON.stringify(users));
    removeUser(socket.id);
    io.emit("getUsers", users);
  });
});

http.listen(process.env.PORT || 8000, "0.0.0.0", function () {
  console.log("Listening on port");
});
