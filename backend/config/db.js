import mongoose from "mongoose";

// function for connecting to the data
const connectDB = async () => {
  try {
    // making a coonection to database using mongoose
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error", error);
    // for immediate termination of server in case database connection fails
    process.exit(1);
  }
};

export default connectDB;
