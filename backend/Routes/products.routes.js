import {
  getProducts,
  getSingleProduct,
  postProducts,
} from "../Controller/products.controller.js";
import express from "express";

// creating seperate router for products
const productRoute = express.Router();

// paths to get products and post products
productRoute.get("/", getProducts);
productRoute.get("/:id", getSingleProduct);
productRoute.post("/", postProducts);

export default productRoute;
