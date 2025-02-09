import userModel from "../models/userSchema.js";
import Session from "../models/sessionSchema.js";
import express from "express";
import { hashPassword, comparePassword } from "../utils/passwordUtils.js";
import { sendAuthEmail } from "../communications/authEmail.js";
import { createToken, decodeToken } from "../utils/tokenUtils.js";
const userRouter = new express.Router();
import dotenv from "dotenv";

dotenv.config();

//register user using direct api call through postman only.
//registration of non admin roles can be done through web with admin access
userRouter.post("/register", async (req, res) => {
  try {
    const user = req.body;

    //check for crucial fields to be existing if not return SC 400
    if (!user.email || !user.userName || !user.password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    //check for existing user
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    //hash password using hashPassword function
    const hashedPassword = await hashPassword(user.password);

    //create a newUser instance of userModel
    const newUser = new userModel({
      email: user.email,
      userName: user.userName,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
    });

    //save the new user
    await newUser.save();
    return res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// register agents or new user through admin dashboard
userRouter.post("/registerByAdmin", async (req, res) => {
  try {
    const user = req.body;

    //check for crucial fields
    if (!user.email || !user.userName || !user.password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    //check for existing users in the database
    const existingUser = await userModel.findOne({ email: user.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists." });
    }

    //hashpassword using hased password
    const hashedPassword = await hashPassword(user.password);

    // create a new user  instance of userModel using  req.body
    const newUser = new userModel({
      email: user.email,
      userName: user.userName,
      password: hashedPassword,
      phoneNumber: user.phoneNumber,
      address: user.address,
      role: user.role,
    });

    //save the new user
    await newUser.save();

    //send success email to registered user with email and password.
    await sendAuthEmail(
      user.email,
      "Welcome to Charming Aura Wellness",
      `You can now login to  your account at ${process.env.FRONTEND_URL} and start using our services.
      credentials :  ${user.userName}/${user.password}\n

      You are advised to change your password  after first login to avoid any  security risks.
      `
    );

    //success response
    return res.status(200).json({ message: "User created successfully." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const sessionData = req.body;
    console.log("login request recieved : ", req.body);

    //find user using email
    const user = await userModel.findOne({ email });

    //if not user found return
    if (!user) {
      return res.status(400).json({ message: "Email does not exist." });
    }

    //if user exists check for password
    const isValidPassword = await comparePassword(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: "Invalid password." });
    }

    //checking for active sessions using login email
    // const activeSession = await Session.find({ email: email, active: true });

    // if (activeSession.length > 0) {
    //   return res.status(400).json({
    //     message: "You already have an active session.",
    //     activeSession,
    //   });
    // }

    //generate token using jwt
    const token = createToken({ id: user._id.toString(), role: user.role });

    //create a new session
    const newSession = new Session({
      email: user.email,
      authToken: token,
      active: true,
      ip: sessionData.ip,
      device: sessionData.device,
      browser: sessionData.browser,
      os: sessionData.os,
      location: sessionData.location,
    });

    await newSession.save();

    //send token to client
    return res
      .status(200)
      .json({ message: " Login successful", user: user, token: token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//logout and set active session to false
userRouter.post("/logout", async (req, res) => {
  try {
    const session = await Session.findOne({
      email: req.body.email,
      active: true,
    });
    if (!session) {
      return res.status(400).json({ message: "No active session found." });
    }

    // Update the session data from active to passive
    session.active = false;
    await session.save();

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//function to get All users
userRouter.get("/get", async (req, res) => {
  try {
    //find all users
    const users = await userModel.find().select("-password");
    //send response
    return res.status(200).json(users);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get user by user._id
userRouter.get("/get/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await userModel.findById(id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to request a password reset
userRouter.post("/request-password-reset", async (req, res) => {
  try {
    const { email } = req.body;
    console.log("email", email);
    const user = await userModel.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const token = createToken(
      { email: email, id: user._id, createdAt: Date.now() },
      "1d"
    );

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

    await sendAuthEmail(
      user.email,
      "Password Reset",
      `Click the link to reset your password: ${resetLink}`
    );

    return res
      .status(200)
      .json({ message: "Password reset link sent to your email." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to reset the password
// Route to reset the password
userRouter.post("/reset-password", async (req, res) => {
  try {
    const { password } = req.body;
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    if (!token) {
      return res.status(400).json({ message: "Token is required." });
    }

    // Decode the token to extract email and user ID
    const decoded = decodeToken(token);
    const { email, id } = decoded;

    console.log(email);

    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (await comparePassword(password, user.password)) {
      return res
        .status(400)
        .json({ message: "You cannot use the same password." });
    }

    // Create a hashed password
    const hashedPassword = await hashPassword(password);

    // Update the user's password
    user.password = hashedPassword;
    await user.save();

    // Send confirmation email
    await sendAuthEmail(
      email,
      "Password Changed",
      "Your password was recently changed. If it was not you, we strongly advise you to change the password by either contacting the admin or using the forgot password option."
    );

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

userRouter.put("/update-user", async (req, res) => {
  try {
    const user = req.body;
    if ((!user.email || !user.userName, !user.phoneNumber)) {
      return res.status(400).json({ message: "User data is required." });
    }
    const existingUser = await userModel.findById(user.email);
    if (!existingUser) {
      return res.status(404).json({ message: "User not found." });
    }
    //update the user with new data
    await userModel.findByIdAndUpdate(user.email, {
      userName: user.userName,
      phoneNumber: user.phoneNumber,
      email: user.email,
      role: user.role,
      address: user.address,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default userRouter;
