const express = require('express');
const UserAuth = require("../middlewares/auth");
const bcrypt = require("bcryptjs");
const UserModel =require("../models/user");
const { validatorLoginEditing } = require("../utils/validators")
const profilerouter = express.Router();

profilerouter.get("/profile/view", UserAuth, async (req,res)=>{
    try{
    const token = req.token
    const user = req.user
    if(token){
       res.send(user);
    }
   
   
    }catch(err){
        res.status(500).json({message: "Internal server error", error: err.message})
    }

})

profilerouter.patch("/profile/view/edit", UserAuth, async (req,res)=>{
    try{
        const loggedInUser = req.user;
        if(!validatorLoginEditing(req)){
            return res.status(400).json({message: "Invalid fields in request body"});
        }

        Object.keys(req.body).forEach((key)=>{
            loggedInUser[key] = req.body[key];
        });

        await loggedInUser.save();
        res.json({ message: `${loggedInUser.firstName} Profile updated successfully`, user: loggedInUser });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message });
    }
});

profilerouter.delete("/profile/view/delete", UserAuth, async (req,res)=>{
    try{
        const user=req.user;
        await user.deleteOne();
        res.json({message: `${user.firstName} Profile deleted successfully`});
    } catch (err) {
        res.status(500).json({ message: "Internal server error", error: err.message }); 
    }
})

profilerouter.patch("/profile/view/password", UserAuth, async (req,res)=>{
  try
  {const token = req.cookies;
  const user= req.user;
  const userid = user._id;
 
  if(!(await user.validatePassword(req.body.currentPassword))){
    res.json({message: "Invalid password"});
    return;
  }     
  
  else{
     const tochangepassword = req.body.password;
     const hashpass=  await bcrypt.hash(tochangepassword, 12);
     const newPassword =await UserModel.updateOne({_id:userid},{$set: {password: hashpass}} );
     res.json({message: "Password changed successfully"});

}}
catch(err){
    res.status(500).json({ message: "Internal server error", error: err.message }); }
})

module.exports = profilerouter;