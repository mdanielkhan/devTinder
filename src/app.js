const express = require("express");
// app.js
const { adminmiddleware, usermiddleware } = require("./utils/middlewares");
const app = express();



app.use("/",(err, req, res, next) => {
    if (err) {
    console.error(err.stack);
    res.status(500).send("Something broke!");
  }

});

app.use("/admin", adminmiddleware) 




app.get("/admin/data",  (req, res,next) => {
   
    res.send("Admin Data Accessed")
 
    
});
app.delete("/admin/delete", (req, res,next) => 
{

    res.send("Admin Delete Accessed")

})
app.post("/user/login",(req,res,next)=>
{
    res.send("User Login Accessed")
})

app.use("/user",usermiddleware)




app.get("/user/data", (req, res,next) => {
    res.send("User Data Accessed")
})

app.delete("/user/delete",  (req, res,next) => {
    res.send("User delete Accessed")
})






app.listen(6969, () => {
    console.log("Server's up and Running at 6969 port!");
});