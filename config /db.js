const mongoose = require("mongoose");
const { mongoURI } = require("./keys");

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to the database successfully");
  } catch (err) {
    console.error("Database connection failed:", err.message);
    process.exit(1); // Exit with a failure code
  }
};

module.exports = connectDB;
