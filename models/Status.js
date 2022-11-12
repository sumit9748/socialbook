const mongoose = require("mongoose");

const StatusSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      default: "",
    },
    statusPic: {
      type: String,
      default: "",
    },
    statusText: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    userstatus: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", StatusSchema);
