import express from "express";
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../Controller/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";

// creating seperate router for authorization 
const authRouter = express.Router();

// paths for authorization
authRouter.get("/", protect, currentUser);
authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
