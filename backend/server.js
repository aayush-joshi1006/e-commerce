import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import productRoute from "./Routes/products.routes.js";
import cartRoute from "./Routes/cart.routes.js";
import authRouter from "./Routes/auth.routes.js";

// getting environment variables
dotenv.config();
// connection to the database
connectDB();

// iinitializing the server
const app = express();
// getting port from .env if not avaialble set it to 8080
const PORT = process.env.PORT || 8080;

// CORS middleware with full config
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//     credentials: true,
//   })
// );

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://e-commerce-tau-ten-85.vercel.app", // deployed frontend
];

app.use(
  cors({
    origin(origin, callback) {
      // allow same-origin/non-browser requests (e.g. curl, server-to-server)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

// initializing cookie parser for accessing cookie
app.use(cookieParser());
// json middleware so that json format files can be read
app.use(express.json());

// Routes
app.use("/products", productRoute);
app.use("/cart", cartRoute);
app.use("/auth", authRouter);

// Optional: handle errors so you don't leak "Network Error"
app.use((err, req, res, next) => {
  if (err?.message === "Not allowed by CORS") {
    return res
      .status(403)
      .json({ message: "CORS blocked", code: "CORS_FORBIDDEN" });
  }
  const status = err.status || 500;
  res
    .status(status)
    .json({ message: err.message || "Server error", code: "SERVER_ERROR" });
});
// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
