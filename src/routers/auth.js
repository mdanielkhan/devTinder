const express = require('express');

const UserModel =require("../models/user");
const{ validatorSignUp} = require("../utils/validators");
const hash = require("bcryptjs");
const UserAuth = require('../middlewares/auth');
const authrouter = express.Router();

authrouter.post("/signup", async (req,res)=>{
   try{
        
   
    const {firstName,email,password,age,gender} =  req.body;  // this is called destructuring assignment, it allows us to extract values from objects and arrays and assign them to variables in a more concise way.
    validatorSignUp(req);

       const passwordHash = await hash.hash(password,10);
   
        const user = new UserModel({
            firstName,
            email,
            password:passwordHash,  // this is called object property shorthand, it allows us to create an object with properties that have the same name as the variables we are assigning to them. In this case, we are creating an object with a property called password that has the value of the passwordHash variable.
            age,
            gender
   })

   const existingUser = await UserModel.findOne({email});
    if(existingUser ){
        res.send("User already exists");
        return;
    }
   
        await user.save();//
        const userObj = user.toObject()

        delete userObj.password

        res.status(201).json({message:"User created successfully",userObj})
        console.log(user);

    

   }catch(err){
    if(err.message === "All fields are required" || 
       err.message === "Please enter a valid email address" ||
       err.message === "Password must be at least 8 characters long..."){
        return res.status(400).json({message: err.message});
    }
    res.status(500).json({message: "Internal server error", error: err.message})
}
})

authrouter.post("/login"  , async (req,res)=>{
    try{

        const {email,password }=req.body ;
        const user = await UserModel.findOne({email}).select("+password");
        if(!user){
            return res.status(400).json({message:"User not found"});
        }
        const isPasswordValid = await user.validatePassword(password);
        if(user && isPasswordValid){
         const token = await user.getJWTToken();
           res.cookie("token",token,{
            expires: new Date(Date.now()+ 7 * 24 *60 *60 *1000),
            httpOnly    : true
           })
            console.log("Token generated:", token); // Log the generated token to the console
           const userObj = user.toObject();
           delete userObj.password;
          
        return res.status(200).json({message:"Login successful", user: userObj});         
        }else{
            return res.status(400).json({message:"Invalid email or password" });
        }
   }catch(err){
         res.status(500).json({message: "Internal server error", error: err.message})
        
    }
})

authrouter.post("/logout", async (req, res) => {
  res.clearCookie('token');
  res.send("Logged out successfully");
});

module.exports= authrouter