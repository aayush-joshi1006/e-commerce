import {
  addToCart,
  deleteCartItem,
  getCartItems,
  updateCart,
} from "../Controller/cart.controller.js";
import express from "express";
import { protect } from "../middleware/auth.middleware.js";

const cartRoute = express.Router();

cartRoute.get("/", protect, getCartItems);
cartRoute.post("/", protect, addToCart);
cartRoute.put("/:id", protect, updateCart);
cartRoute.delete("/:id", protect, deleteCartItem);

export default cartRoute;
