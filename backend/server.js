// import express from "express";
// import mongoose from "mongoose";
// import productRoute from "./Routes/products.routes.js";
// import cartRoute from "./Routes/cart.routes.js";

// const app = express();

// const PORT = 4040;

// app.use(express.json());

// mongoose.connect("mongodb://localhost:27017/shoppyglobe");

// const db = mongoose.connection;

// db.on("connected", () => {
//   console.log("Database connection successfull");
// });

// db.on("error", (err) => {
//   console.log("Error while connecting to the database ", err);
// });

// db.on("disconnected", () => {
//   console.log("Database disconnected");
// });

// app.listen(PORT, () => {
//   console.log("Server running in port ", PORT);
// });

// app.use("/api/products", productRoute);
// app.use("/api/cart", cartRoute);

import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import productRoute from "./Routes/products.routes.js";
import cartRoute from "./Routes/cart.routes.js";
import authRouter from "./Routes/auth.routes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/products", productRoute);
app.use("/auth", authRouter);
app.use("/cart", cartRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
