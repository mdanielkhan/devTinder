const mongoose = require("mongoose");

const connectDB = async ()=>{
     await mongoose.connect("mongodb://mdanielkhan2_db_user:PLrZF5DEOyNm04y6@ac-fdy2i7m-shard-00-00.vemfll8.mongodb.net:27017,ac-fdy2i7m-shard-00-01.vemfll8.mongodb.net:27017,ac-fdy2i7m-shard-00-02.vemfll8.mongodb.net:27017/DevTinder?ssl=true&replicaSet=atlas-12mj75-shard-0&authSource=admin&appName=Cluster0")

};

module.exports = connectDB;

