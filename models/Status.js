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
    profilePic: {
      type: String,
      default: "",
    },
    userstatus: {
      type: String,
    },
    expireAt: {
      type: Date,
      default: Date.now,
      index: { expires: "10000m" },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Status", StatusSchema);
