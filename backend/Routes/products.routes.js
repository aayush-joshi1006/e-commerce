import {
  getProducts,
  getSingleProduct,
  postProducts,
} from "../Controller/products.controller.js";
import express from "express";

const productRoute = express.Router();

productRoute.get("/", getProducts);
productRoute.get("/:id", getSingleProduct);
productRoute.post("/", postProducts);

export default productRoute;
