const express = require("express");

const app = express();

app.patch("/user",(req,res)=>{
    res.send("Changes done successfully!")
})


app.post("/user", (req, res) => {

    //logic to save data in teh database
    res.send("Data saved in the Database successfully!!");
});

app.put("/user",(req,res)=>{
    res.send("Successfully Updated the post")
})

 
app.get("/user", (req, res) => {
    res.send({
        firstname: "Daneil",
        lastname: "Khan"
    });
});

app.delete("/user",(req,res)=>{
    res.send("Data deleted succussfully!")
})




app.use("/", (req, res) => {
    res.send("Yo! This is the home page");
});

app.use("/yomama", (req, res) => {
    res.send("Yo mama not here");
});

app.use("/hello",(req,res)=>{
    res.send("Doing my practice for my node js")
    

})


app.use("/text",(req,res)=>{
     res.send("This is the text page")
})



app.listen(6969, () => {
    console.log("Server's up and Running at 6969 port!");
});