const socket = require("socket.io");
const crypto = require("crypto");
const Chat = require("../models/chat");



const getRoomID = ({ userId, targetUserId }) => {
  return crypto.createHash("sha256")
    .update([userId, targetUserId].sort().join("$"))
    .digest("hex");
};
const initializeSocket = (server) => {
  const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    socket.on("joinChat", ({ userId, targetUserId, firstName }) => {
      const roomid = getRoomID({ userId, targetUserId });
      console.log(firstName + " joined the room : " + roomid);
      socket.join(roomid);
    });

    socket.on("sendmessage", async ({ firstName, userId, targetUserId, text }) => {
      const roomId = getRoomID({ userId, targetUserId });

      try {
        let chat = await Chat.findOne({
          participants: { $all: [userId, targetUserId] },
        });

        if (!chat) {
          chat = new Chat({
            participants: [userId, targetUserId],
            messages: [],
          });
        }

        chat.messages.push({ senderId: userId, text });
        await chat.save();
        console.log(firstName + " " + text)

        io.to(roomId).emit("messageReceived", { firstName, text, userId });
      } catch (err) {
        console.error("sendmessage error:", err);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected");
    });
  });
};

module.exports = initializeSocket;
