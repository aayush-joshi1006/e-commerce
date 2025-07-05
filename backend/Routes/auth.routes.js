import express from "express";
import { loginUser, registerUser } from "../Controller/auth.controller.js";

const authRouter = express.Router();

authRouter.post("/login", loginUser);
authRouter.post("/register", registerUser);

export default authRouter