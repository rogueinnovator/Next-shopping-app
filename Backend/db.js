const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/inotebook";

const connectToMongo = async () => {
    await mongoose.connect(mongoURI);
    console.log("shy  connect shu ");
  
};

module.exports = connectToMongo;//here we export it to use it in other function where we can use it to connect to database
