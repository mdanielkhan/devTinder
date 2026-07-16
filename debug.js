// require("dotenv").config();
// const mongoose = require("mongoose");
// const connectionRequest = require("./src/models/connectionRequest");
// const User = require("./src/models/user"); // adjust path/name to your actual model

// const run = async () => {
//     await mongoose.connect(process.env.DB_CONNECTION);

//     const results = await connectionRequest.find({
//         status: "accepted"
//     }).lean();

//     console.log(JSON.stringify(results, null, 2));

//     const users = await User.find({
//         _id: { $in: ["6a4b6f8183d1b6ef8d383bda", "6a54d87a243e7c938920bd0d", "6a54e992a2257aeffcf10bcc"] }
//     }).select("firstName lastName email").lean();

//     console.log(JSON.stringify(users, null, 2));

//     await mongoose.disconnect();
// };

// run();