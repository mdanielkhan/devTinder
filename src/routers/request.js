const express = require('express');
const UserAuth = require("../middlewares/auth");

const requestrouter = express.Router();

requestrouter.post("/sendconnection", UserAuth, async (req,res)=>{
       res.send(req.user.firstName+" Sent the connection");
 
})

module.exports = requestrouter;