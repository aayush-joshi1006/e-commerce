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

const cartRoute = express.Router();

cartRoute.get("/", protect, getCartItems);
cartRoute.post("/", protect, addToCart);
cartRoute.put("/:id", protect, updateQuantity);
// cartRoute.patch(
//   "/:id",
//   protect,
//   (req, res, next) => {
//     console.log("PATCH /cart/:id called");
//     next();
//   },
//   updateQuantity
// );
// cartRoute.delete("/:id", protect, deleteCartItem);
cartRoute.delete("/clear", protect, clearCart);

export default cartRoute;
