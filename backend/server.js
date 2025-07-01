import express from "express";
import mongoose from "mongoose";
import { productRoutes } from "./Routes/products.routes.js";
import { cartRoutes } from "./Routes/cart.routes.js";

const app = express();

const PORT = 4040;

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/shoppyglobe");

const db = mongoose.connection;

db.on("connected", () => {
  console.log("Database connection successfull");
});

db.on("error", (err) => {
  console.log("Error while connecting to the database ", err);
});

db.on("disconnected", () => {
  console.log("Database disconnected");
});

app.listen(PORT, () => {
  console.log("Server running in port ", PORT);
});

productRoutes(app);
// cartRoutes(app);
