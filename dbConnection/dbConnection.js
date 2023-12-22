const mongoose = require("mongoose");
const connect = async function () {
  try {
    await mongoose.connect(process.env.DB_URI);
  } catch (error) {
    console.log(error.message);
  }
};


module.exports={connect}