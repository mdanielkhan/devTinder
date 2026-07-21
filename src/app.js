require('dotenv').config();
const express = require("express");
const connectDB = require("./config/database");
const app = express();
const cookieParser = require("cookie-parser");
const authrouter = require("./routers/auth");
const profilerouter = require("./routers/profile");
const requestrouter = require("./routers/request");
const userRouter = require("./routers/user");
const cors = require("cors")
const http = require("http")

const initializeSocket = require('./utils/socket');
app.use(cookieParser());

app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173", "https://devtinder.duckdns.org"],
  credentials: true
}))

const server = http.createServer(app);
initializeSocket(server);

app.use("/",authrouter);
app.use("/",profilerouter);
app.use("/",requestrouter); 
app.use("/",userRouter);



connectDB() 
    .then(()=>{  
        console.log("Database connected successfully"),
        server.listen(process.env.PORT,()=>
        {
            console.log("Server is running on port 7777");
        })
    })
    .catch((err)=>{
        console.error("Database connection failed",err);
    });

