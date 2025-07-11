import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoute from "./Routes/products.routes.js";
import cartRoute from "./Routes/cart.routes.js";
import authRouter from "./Routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 8080;

// ✅ CORS middleware with full config
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// ✅ Manual preflight middleware for extra safety
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );

  if (req.method === "OPTIONS") {
    return res.sendStatus(204); // Preflight response
  }

  next();
});

app.use(cookieParser());
app.use(express.json());

// ✅ Routes
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRouter);

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
