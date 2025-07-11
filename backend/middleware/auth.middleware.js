import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

export const protect = async (req, res, next) => {
  // const authHeader = req.headers.authorization;
  const token = req.cookies.token;
  // if (authHeader && authHeader.startsWith("Bearer ")) {
  //   const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await userModel.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
