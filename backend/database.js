const { default: mongoose } = require("mongoose");
const dotenv = require('dotenv')

dotenv.config()

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("Connected to Mongodb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDB;