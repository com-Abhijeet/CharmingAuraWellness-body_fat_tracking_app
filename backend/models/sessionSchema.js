import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      ref: "User",
    },
    ip: {
      type: String,
    },
    device: String,
    browser: String,
    os: String,
    location: String,
    authToken: String,
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Session = mongoose.model("Session", sessionSchema);

export default Session;
