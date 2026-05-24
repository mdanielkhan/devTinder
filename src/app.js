const express = require("express");

const app = express();


app.use([
    (req,res,next)=>{
    console.log("!st request handler!!!!")
    // res.send("1dt request handled successfully")
    next()
    
},
(req,res,next)=>
{
    // next() 
    console.log("2nd request handler!!!!")
    next()
    // res.send("2nd request handled")
}],

(req,res,next)=>{

    res.send("3Rd req handler")
     console.log("3rd request handler!!!!")
     
})




app.listen(6969, () => {
    console.log("Server's up and Running at 6969 port!");
});