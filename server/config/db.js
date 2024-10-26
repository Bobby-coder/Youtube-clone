import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const data = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Database connected with ${data.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}` || "Internal sever error");
  }
};

export default connectDB;
