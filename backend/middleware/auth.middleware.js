import jwt from "jsonwebtoken";
import userModel from "../Model/user.model.js";

// middleware for autherization
export const protect = async (req, res, next) => {
  // getting token from cookies
  const token = req.cookies.token;
// in case no token is not present in cookies
  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
  try {
    // verify the token available
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // setting the current user excluding paswword
    req.user = await userModel.findById(decoded.userId).select("-password");
    next();
  } catch (error) {
    // in case authorization fails
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
