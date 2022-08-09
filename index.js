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
const router = express.Router();
const path = require("path");
const cors = require("cors");

dotenv.config();

mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
app.use("/images", express.static(path.join(__dirname, "images")));

app.use(cors({
  origin: "*",
  methods: "GET,POST,PUT,DELETE",
})
);
//middleware
app.use(express.json());
// app.use(helmet());
app.use(morgan("common"));


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
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

app.use(express.static(path.join(__dirname, "/react-social/build")));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/react-social/build', 'index.html'));
});


app.listen(process.env.PORT || 8000, '0.0.0.0', function () {
  console.log('Listening on port');
});

