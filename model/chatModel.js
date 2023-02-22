const mongoose = require("mongoose");

const chatSchema = new mongoose.Schema(
  {
    MindMate: {
      type: String,
    },
    user: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Chat = mongoose.model("chat", chatSchema);
module.exports = Chat;
