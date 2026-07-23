const express = require('express');
const UserModel =require("../models/user");
const UserAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const { set } = require('mongoose');

const userRouter = express.Router();
const user_save = "firstName about skill photoUrl age gender"

userRouter.get("/user/requests/received", UserAuth, async (req, res) => {
    try {
        const loggedInUserId = req.user._id;

        const receiver=loggedInUserId;
        const status="interested";

        const connectionRequests = await connectionRequest.find({receiver, status}).populate("sender", "firstName lastName email"); 
        

        res.json({ receivedRequests: connectionRequests });

    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

userRouter.get("/user/connections", UserAuth, async (req, res) => {
    try {
        const loggedin_user = req.user._id
        

        const connectionRequests = await connectionRequest.find({
            $or: [
                { sender: loggedin_user, status: "accepted" },
                { receiver: loggedin_user, status: "accepted" }
            ]
        }).populate("sender", user_save)
          .populate("receiver", user_save)

        const data = connectionRequests.map((row) => {
    if (row.receiver._id.toString() === loggedin_user.toString()) { // 53b === 53b → true
    return row.sender
    }
    return row.receiver
})
        res.json({ data })

    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

userRouter.get("/user/feed", UserAuth, async (req, res) => {
    try {
        const loggedInId = req.user._id;

        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await connectionRequest.find({
            $or: [{ sender: loggedInId }, { receiver: loggedInId }]
        }).select("sender receiver");

        const hideUsers = new Set();
        connectionRequests.forEach((item) => {
            hideUsers.add(item.sender.toString());
            hideUsers.add(item.receiver.toString());
        });
        hideUsers.add(loggedInId.toString());

        const data = await UserModel.find({
            $and:[{_id: { $nin: Array.from(hideUsers)} },
                   {_id: {$ne: loggedInId}}
            ]
        })
            .select(user_save)
            .sort({ _id: 1 }) 
            .skip(skip)
            .limit(limit);

        res.json({ data });
    } catch (err) {
        res.status(400).json({ message: "ERROR: " + err.message });
    }
});

userRouter.get("/user/:targetid" , UserAuth , async (req,res ) =>{
   
   try{ const loggedin_user = req.user._id
    const {targetid} = req.params

    const isConnected  = await connectionRequest.findOne({
        $or:[
            {sender:loggedin_user,receiver:targetid,status:"accepted"},
            {sender:targetid,receiver:loggedin_user,status:"accepted"},
            
        ]
    })

    if(!isConnected){
        return res.status(403).json({ message: "Not authorized to view this profile" })
    }

    const target_user = await UserModel.findById(targetid).select(user_save)

    if(!target_user){
        return res.status(403).json({ message: "No user found" })
    }
    res.json({ data: target_user });
}catch(err){
    res.status(500).json("Internal server error")

}


})

module.exports= userRouter // 
    