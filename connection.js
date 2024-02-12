const mongoose = require("mongoose");
const url = process.env.URL;

const connectDB = () => {
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("random commit");
  console.log("DB connected..!");

  console.log("tarique");
};

module.exports = connectDB;
