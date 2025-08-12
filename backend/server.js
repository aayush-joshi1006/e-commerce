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
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

const allowedOrigins = [
  "http://localhost:5173", // for local dev
  "https://e-commerce-tau-ten-85.vercel.app", // deployed frontend
];
//  Manual preflight middleware for extra safety
// app.use((req, res, next) => {

//   // response headers
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://e-commerce-tau-ten-85.vercel.app/"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, POST, PUT, PATCH, DELETE, OPTIONS"
//   );

//   if (req.method === "OPTIONS") {
//     // Preflight response
//     return res.sendStatus(204);
//   }
//   next();
// });

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
