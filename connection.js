const mongoose = require("mongoose");
const url =
  "mongodb+srv://Tarique006:hbSLRhy9pGemmJvo@cluster0.mautya6.mongodb.net/?retryWrites=true&w=majority";

const connectDB = () => {
  mongoose.connect(url, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("DB connected..!");
};

module.exports = connectDB;
