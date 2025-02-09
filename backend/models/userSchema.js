import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userName: String,
    email: String,
    password: String,
    role: String,
    phoneNumber: String,
    address: String,
  },
  { timestamps: true }
);

const userModel = mongoose.model("User", userSchema);

export default userModel;
