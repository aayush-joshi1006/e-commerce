import userModel from "../Model/user.model.js";
import { generateToken } from "../utils/generateToken.js";
import bcrypt from "bcryptjs";

// controller for registering user
export const registerUser = async (req, res) => {
  // getting name,email,password from request body
  const { name, email, password } = req.body;

  try {
    // checking if email already exists in database
    const existing = await userModel.findOne({ email });
    if (existing) {
      // user already exists message in case the email is found in the database
      return res.status(400).json({ message: "User already exists" });
    }

    // brypting the password in he database
    const hashedPassword = await bcrypt.hash(password, 10);

    // creating a user in the database
    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    // creating token corresponding to the user
    const token = generateToken(newUser._id);

    // Setting token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // returning current user and token
    return res.status(201).json({
      user: {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
      token,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Registration failed!!", error: error.message });
  }
};

// controller for logging in a user
export const loginUser = async (req, res) => {
  // getting email and password from request body
  const { email, password } = req.body;
  try {
    // finding user with email id
    const user = await userModel.findOne({ email });
    // in case user not found
    if (!user) {
      return res.status(404).json({ message: "User not Found" });
    }
    // checking if password matches 
    const isMatched = await bcrypt.compare(password, user.password);
    if (!isMatched) {
      // in case password doesn't match
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // generating jwt token in case email and passwod matches
    const token = generateToken(user._id);

    // storing token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "None", // Or 'None' if you're testing on cross-origin + HTTPS
      secure: true, // Set to true in production with HTTPS
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // returning user and token
    return res.status(200).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Login failed", error: error.message });
  }
};

// controller for getting current user
export const currentUser = async (req, res) => {
  // checking if there is a user available
  if (!req.user) {
    return res.status(200).json({ user: null });
  }

  // If logged in, return the user object
  return res.status(200).json({ user: req.user });
};

// controller for logging out
export const logoutUser = async (req, res) => {
  // clearing the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  // returning the response with the message user is logged out
  return res.status(200).json({ message: "Logged out successfully" });
};
