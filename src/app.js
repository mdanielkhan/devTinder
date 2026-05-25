const express = require("express");
const connectDB = require("./config/database");
const app = express();
const UserModel =require("./models/user");


app.post("/signup", async (req,res)=>{
    try{

        const User=new UserModel({
            firstName:"John",
            lastName:"Doe",
            email:"johndoe@example.com",
            age:30,
            password:"password123"
        })
        await User.save();
        res.status(201).json({message:"User created successfully",User})
    }catch(err){
        res.status(500).json({message:"Internal server error",error:err.message})
    }
})



connectDB() 
    .then(()=>{  
        console.log("Database connected successfully"),
        app.listen(6969,()=>
        {
            console.log("Server is running on port 6969");
        })
    })
    .catch((err)=>{
        console.error("Database connection failed",err);
    });




