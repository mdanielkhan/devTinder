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
    socket.on("joinChat", ({ userId, targetUserId ,firstName}) => {
        const roomid = getRoomID({ userId, targetUserId })
        console.log(firstName  +" joined the room : "+roomid)
        socket.join(roomid)

    });

    (socket.on("sendmessage", ({firstName ,userId, targetUserId,text}) => {
      const roomId = getRoomID({ userId, targetUserId })
      io.to(roomId).emit("messageReceived"  )
      console.log(firstName + " " + text)
    }),
     socket.on("disconnect", ({}) => {}));
  }


)
  ;
};

module.exports = initializeSocket;
