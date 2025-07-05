import cartModel from "../Model/cart.model.js";

export async function getCartItems(req, res) {
  try {
    const items = await cartModel.find().populate("productId");
    return res.status(200).json(items);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch cart", error: error.message });
  }
}

export async function addToCart(req, res) {
  const { productId, quantity } = req.body;

  try {
    const existingItem = await cartModel.findOne({ productId });
    if (existingItem) {
      existingItem.quantity += quantity;
      await existingItem.save();
      return res.status(200).json(existingItem);
    }
    const newCartItem = new cartModel({ productId, quantity });
    const savedItem = await newCartItem.save();
    return res.status(201).json(savedItem);
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Failed to add item to cart", error: err.message });
  }
}

export async function updateCart(req, res) {
  const currentID = req.params.id;
  const { quantity } = req.body;

  try {
    const item = await cartModel.findByIdAndUpdate(
      currentID,
      { quantity },
      { new: true }
    );
    if (!item) {
      return res.status(404).json({ message: "Cart Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    return res.status(500).json({
      message: "Failed to update the item in the cart",
      error: error.message,
    });
  }
}

export async function deleteCartItem(req, res) {
  const { id } = req.params;
  try {
    const itemDeleted = await cartModel.findByIdAndDelete(id);
    if (!itemDeleted) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json({ message: "Item deleted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Error deleting the item",
      error: error.message,
    });
  }
}
