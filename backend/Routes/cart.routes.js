import {
  addToCart,
  clearCart,
  deleteCartItem,
  getCartItems,
  updateCart,
  updateQuantity,
} from "../Controller/cart.controller.js";
import express from "express";
import { protect } from "../middleware/auth.middleware.js";

// creating seperate router for cart methods 
const cartRoute = express.Router();

// creting paths for diffrent operations with autherization as middleware
cartRoute.get("/", protect, getCartItems);
cartRoute.post("/", protect, addToCart);
cartRoute.put("/:id", protect, updateQuantity);
cartRoute.delete("/clear", protect, clearCart);
cartRoute.delete("/:id", protect, deleteCartItem);

export default cartRoute;
