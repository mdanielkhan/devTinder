const mongoose = require('mongoose');

const connectionRequestSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: {
        values: ["interested","ignored", "accepted", "rejected"],
        message: "Status is invalid",
      },
      default: "pending",
    },
  },
  { timestamps: true }
);

connectionRequestSchema.index({ sender: 1, receiver: 1 });

connectionRequestSchema.pre("save", async function (next) {
  if (this.sender.equals(this.receiver)) {
    return next(new Error("Cannot send a request to yourself"));
  }
  
});

const connectionRequestModel = mongoose.model("ConnectionRequest", connectionRequestSchema);

module.exports = connectionRequestModel;