import cartModel from "../Model/cart.model.js";

// controller for getting all cart items
export async function getCartItems(req, res) {
  try {
    // getting userId from middleware
    const userId = req.user._id;
    // getting all the cart items from database
    const cart = await cartModel
      .findOne({ userId })
      .populate("items.productId");
    // in case cart is not present return empty array
    if (!cart) {
      return res.status(200).json({ items: [] }); // empty cart fallback
    }
    // returning cart items as the response
    return res.status(200).json(cart.items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch cart", error: error.message });
  }
}

// controller for adding products to he cart
export async function addToCart(req, res) {
  // getting productID and quantity from request body , in case quantity is not present set quantity to 1
  const { productId, quantity = 1 } = req.body;
  // getting userId from middleware
  const userId = req.user._id;

  try {
    // finding cart with the userId
    let cart = await cartModel.findOne({ userId });
    // in case cart is not present
    if (!cart) {
      // create a cart with the userId in case not present
      cart = new cartModel({
        userId,
        items: [{ productId, quantity }],
      });
    } else {
      // in case cart is present edit he quantity to the cart item
      const existingItem = cart.items.find(
        // finding current cart item with porductId
        (item) => item.productId.toString() === productId
      );
      // if cart item exist add the quanity to the same product
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        // in case product does not exists create a new one
        cart.items.push({ productId, quantity });
      }
    }
    // save the changes to the database
    const savedCart = await cart.save();
    // returning the updated cart
    return res.status(200).json({ success: true, data: savedCart });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add item to cart", error: err.message });
  }
}

// controller for setting the quantity of the product in cart
export async function updateCart(req, res) {
  // getting product id from the url
  const productId = req.params.id;
  // getting the qunatity to set from request body
  const { quantity } = req.body;
  // getting userId from middleware
  const userId = req.user._id;

  try {
    // finding the cart in database from userId
    const cart = await cartModel.findOne({ userId });
    // in case cart is not found give approprivat emessage
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    // finding the item in cart with productId
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    // in case item is not found
    if (!item) {
      return res.status(404).json({ message: "Item not found in the cart" });
    }
    // updating the cart item quantity
    item.quantity = quantity;
    // saving the changes in database
    await cart.save();
    // returning the cart in response
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

// controller to delete a cart item from cart
export async function deleteCartItem(req, res) {
  // getting id from params as productId
  const { id: productId } = req.params;
  // getting userId from middleware
  const userId = req.user._id;

  // checking if the type of productId is valid ie ObjectId
  if (!Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // finding the product and updaing the cart
    const updatedCart = await cartModel.findOneAndUpdate(
      // find by userId
      { userId },
      {
        // pull the cart item from the database with matching productId
        $pull: {
          items: { productId: new Types.ObjectId(productId) },
        },
      },
      { new: true }
    );

    // in case cart item is not found
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // returning the successful removal message with deleted item
    return res
      .status(200)
      .json({ message: "Item removed from cart", cart: updatedCart });
  } catch (error) {
    return res.status(500).json({
      message: "Failed to remove item from the cart",
      error: error.message,
    });
  }
}

// updating quantity by one
export async function updateQuantity(req, res) {
  // getting productId from url
  const { id: productId } = req.params;
  // getting userId from middleware
  const userId = req.user._id;
  // getting action "increment/decrement" from request body
  const { action } = req.body;

  // checking if productId has valid ObjectId type
  if (!Types.ObjectId.isValid(productId)) {
    return res.status(400).json({ message: "Invalid product ID" });
  }

  try {
    // finding cart with userId
    const cart = await cartModel.findOne({ userId });

    // in case cart is not found
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // Explicitly convert to ObjectId for matching
    const prodIdObj = new Types.ObjectId(productId);

    // getting the index of cart item
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(prodIdObj)
    );

    // in case cart item index is not found
    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    // in case the action is increment
    if (action === "increment") {
      // increse the quantity of cart item by 1
      cart.items[itemIndex].quantity += 1;
    } else if (action === "decrement") {
      // in case the action is decrement
      // decrese the quantity of cart item by 1
      cart.items[itemIndex].quantity -= 1;

      // in case the quantity becomes zero or less than zero remove it
      if (cart.items[itemIndex].quantity <= 0) {
        // Remove item from array
        cart.items.splice(itemIndex, 1);
      }
    } else {
      // in case no action is porvided in request body
      return res
        .status(400)
        .json({ message: "Invalid action. Use 'increment' or 'decrement'." });
    }

    // Save changes to database
    await cart.save();
    // return cart as the response with updation message
    return res.status(200).json({ message: "Cart updated", cart });
  } catch (error) {
    console.error("Error updating quantity:", error);
    return res.status(500).json({
      message: "Failed to update quantity",
      error: error.message,
    });
  }
}

// controller for removing all cart items from the cart
export async function clearCart(req, res) {
  // getting userId from middleware
  const userId = req.user?._id;

  // in case userId is missing
  if (!userId) {
    return res.status(400).json({ message: "User ID is missing" });
  }

  try {
    // finding the cart and updating it to empty array
    const updatedCart = await cartModel.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    );

    //  in case cart updation fails
    if (!updatedCart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    // return the response with clear cart
    return res.status(200).json({ message: "Cart cleared", cart: updatedCart });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to clear cart", error: error.message });
  }
}
