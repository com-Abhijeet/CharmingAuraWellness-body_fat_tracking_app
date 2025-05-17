import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./controllers/userController.js";
import reportRouter from "./controllers/reportController.js";
import customerRouter from "./controllers/customerController.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: ["http://localhost:5173", "https://app.charmingaurawellness.com"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/reports", reportRouter);
app.use("/api/v1/customers", customerRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
