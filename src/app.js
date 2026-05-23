const express = require("express");

const app = express();

app.get("/", (req, res) => {
    res.send("Yo! This is the home page");
});

app.get("/yomama", (req, res) => {
    res.send("Yo mama not here");
});

app.listen(6969, () => {
    console.log("Server's up and Running at 6969 port!");
});