const mongoose = require("mongoose"); // Equivalent to Import

const connection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/my_blog");
    console.log("Good Connection!");
  } catch (error) {
    console.log(error);
    throw new Error("Unable connection to DB");
  }
};

// Export function to be use in other files
module.exports = {
  connection,
};
