const express = require('express');
const UserModel =require("../models/user");
const UserAuth = require("../middlewares/auth");
const connectionRequest = require("../models/connectionRequest");
const mongoose = require("mongoose")

const requestrouter = express.Router();

requestrouter.post("/request/send/:status/:userId", UserAuth, async (req,res)=>{ 
       try{
                   const sender_id= req.user._id;
                   const receiver_id = req.params.userId;
                   const status = req.params.status;

                   const isallowed = ["interested","ignored"]

                   if (!mongoose.Types.ObjectId.isValid(receiver_id)) {
                             return res.status(400).json({message: "Invalid receiver ID"});
                            }
                   if(!isallowed.includes(status)){
                       return res.status(400).json({message:"Invalid status"});
                   }

              const receiverExists = await UserModel.findOne({ _id: receiver_id });
                   if(!receiverExists){
                             return res.status(404).json({message:"Receiver not found"});
                   }


                   const existingRequest = await connectionRequest.findOne({
                     
                     $or:[{sender: sender_id, receiver: receiver_id},
                            {sender:receiver_id,receiver:sender_id}
                     ]
                   })
                   if(existingRequest){
                     return res.status(409).json({message:"Request already exists", request: existingRequest});
                     
                   }
                   
             
                   const request = new connectionRequest({
                            sender: sender_id,
                            receiver: receiver_id,
                            status
                         })
                         await request.save();
                         res.status(201).json({message:"Request sent successfully",request})
                   
                   

       }catch(err){
        res.status(500).json({message: "Internal server error", error: err.message})
       }
 
})

requestrouter.post("/request/review/:status/:requestId", UserAuth, async (req,res)=>{
       try{
              const Logged_in_user_id = req.user._id;
              const {status, requestId} = req.params;

              const isallowed=["accepted","rejected"]
              if(!isallowed.includes(status)){
                return res.status(400).json({message:"Invalid status"});
              }
               const request = await connectionRequest.findById({
                     _id: requestId,
                     receiver: Logged_in_user_id, // Filter requests where the logged-in user is the receiver
                     status: "interested"
              })
               if(!request){
                     return res.status(404).json({message:"Request not found or not eligible for review"});
               }
                request.status = status;
                const data = await request.save();
                     res.status(200).json({message:"Request reviewed successfully",data})
                  
       }catch(err){
        res.status(500).json({message: "Internal server error", error: err.message})
       }

})
module.exports = requestrouter;