import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/bimrekApp");
    console.log({
      success: true,
      message: "DATABASE CONNECTION SUCCESSFUL.",
    });
  } catch (error) {
    console.log({
      success: false,
      message: "DATABASE CONNECTION FAILED.",
      message: error.message,
    });
  }
};

export default connectDB;
