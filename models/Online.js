const mongoose = require("mongoose");

const OnlineSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
    },
    username: {
      type: String,
    },
    profilePicture: {
      type: String,
      default:"",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Online", OnlineSchema);