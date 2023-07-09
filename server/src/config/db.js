const mongoose = require("mongoose");
const { mongodbURL } = require("../secret");

const connectDatabase = async (option = {}) => {
  try {
    await mongoose.connect(mongodbURL, option);
    console.log("Connet to MongoDB Succesfully estabalis");
    mongoose.connection.on("error", (error) => {
      console.error("Data Base Connection Error is: ", error);
    });
  } catch (error) {
    console.error("Cantnot connet to DB", error.toString());
  }
};

module.exports = connectDatabase;
