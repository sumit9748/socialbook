const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    postId: {
      type: String,
    },
    text: {
      type: String,
      max: 500,
      default: "",
    },
    commenter: {
      type: String,
      default: "",
    },
    commenterPic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
