import jwt from "jsonwebtoken";

// function for generating token when needed
export const generateToken = (userId) => {
  // creating token related to the userId which expires in 7 days
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};
