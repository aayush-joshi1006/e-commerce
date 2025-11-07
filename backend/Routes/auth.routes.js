import express from "express";
import {
  currentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../Controller/auth.controller.js";
import { authOptional, protect } from "../middleware/auth.middleware.js";

// creating seperate router for authorization
const authRouter = express.Router();

// paths for authorization
authRouter.get("/", authOptional, currentUser);
authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);
authRouter.post("/logout", logoutUser);

export default authRouter;
