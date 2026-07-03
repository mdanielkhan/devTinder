const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authrouter = require("./routers/auth");
const profilerouter = require("./routers/profile");
const requestrouter = require("./routers/request");

app.use(cookieParser());

app.use(express.json());


app.use("/",authrouter);
app.use("/",profilerouter);
app.use("/",requestrouter); 



connectDB() 
    .then(()=>{  
        console.log("Database connected successfully"),
        app.listen(7777,()=>
        {
            console.log("Server is running on port 7777");
        })
    })
    .catch((err)=>{
        console.error("Database connection failed",err);
    });

