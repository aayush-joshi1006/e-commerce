import mongoose from "mongoose";

// creating user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// creating user mdel in the database
const userModel = mongoose.model("User", userSchema);

export default userModel;
