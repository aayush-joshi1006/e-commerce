import cartModel from "../Model/cart.model.js";

export async function getCartItems(req, res) {
  try {
    const userId = req.user._id;
    const cart = await cartModel.find({ userId }).populate("items.productId");
    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart fallback
    }
    return res.status(200).json(cart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch cart", error: error.message });
  }
}

export async function addToCart(req, res) {
  const { productId, quantity = 1 } = req.body;
  const userId = req.user._id;

  try {
    let cart = await cartModel.findOne({ userId });
    if (!cart) {
      cart = new cartModel({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    const savedCart = await cart.save();
    return res.status(200).json({ success: true, data: savedCart });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add item to cart", error: err.message });
  }
}

export async function updateCart(req, res) {
  const productId = req.params.id;
  const { quantity } = req.body;
  const userId = req.user._id;

  try {
    const cart = await cartModel.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }

    item.quantity = quantity;
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error("Error updating cart:", error);
    return res.status(500).json({
      message: "Failed to update the item in the cart",
      error: error.message,
    });
  }
}

import { Types } from "mongoose";

export async function deleteCartItem(req, res) {
  const { id: productId } = req.params;
  const userId = req.user._id;
  if (!Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }
  try {
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      {
        $pull: {
          items: { productId: Types.ObjectId(productId) },
        },
      },
      { new: true }
    );
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    return res
      .status(200)
      .json({ message: "Item removed from cart", cart: updateCart });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove item from the cart",
      error: error.message,
    });
  }
}

export async function updateQuantity(req, res) {
  const { id: productId } = req.params;
  const userId = req.user._id;
  const { action } = req.body;

  if (!Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    const cart = await cartModel.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Explicitly convert to ObjectId for matching
    const prodIdObj = new Types.ObjectId(productId);

    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(prodIdObj)
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (action === "increment") {
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrement") {
      cart.items[itemIndex].quantity -= 1;

      if (cart.items[itemIndex].quantity <= 0) {
        cart.items.splice(itemIndex, 1); // Remove item from array
      }
    } else {
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'increment' or 'decrement'." });
    }

    await cart.save(); // Save changes
    return res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({
      message: "Failed to update quantity",
      error: error.message,
    });
  }
}
