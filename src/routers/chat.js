const express = require("express")
const UserAuth = require("../middlewares/auth")
const connectionRequestModel = require("../models/connectionRequest")
const Chat = require("../models/chat")

const chatrouter = express.Router()

chatrouter.get("/chat/:targetid", UserAuth, async (req, res) => {
  try {
    const userid = req.user._id;
    const { targetid } = req.params;

    const isConnected = await connectionRequestModel.findOne({
      $or: [
        { sender: userid, receiver: targetid, status: "accepted" },
        { sender: targetid, receiver: userid, status: "accepted" },
      ],
    });

    if (!isConnected) {
      return res.status(403).json({ message: "Not connected" });
    }

    let chat = await Chat.findOne({
      participants: { $all: [userid, targetid] },
    }).populate({
      path: "messages.senderId",
      select: "firstName lastName",
    });

    if (!chat) {
      chat = new Chat({ participants: [userid, targetid], messages: [] });
      await chat.save();
    }

    res.json(chat);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = chatrouter