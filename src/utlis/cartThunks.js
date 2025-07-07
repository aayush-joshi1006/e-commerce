import { addToCart, removeFromCart, clearCart } from "./cartSlice";

export const addToCartAsunc = (itemId) => async (dispatch) => {
  try {
    await fetch("http://localhost:8080/cart"),
      {
        method: "POST",
        headers: {
          "Content-Tpye": "application/json",
        },
        body: JSON.stringify({ productId: itemId, quantity: 1 }),
      };
    dispatch(addToCart(itemId));
  } catch (error) {
    console.error("Failed to add item to cart ", error);
  }
};

export const removeFromCartAsync = (itemId) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8080/cart/${itemId}`, {
      method: "DELETE",
    });

    dispatch(removeFromCart(itemId));
  } catch (error) {
    console.error("Failed to remove item from cart", error);
  }
};

export const clearCartAsync = () => async (dispatch) => {
  try {
    await fetch("http://localhost:8080/cart/clear", {
      method: "DELETE",
    });

    dispatch(clearCart());
  } catch (error) {
    console.error("Failed to clear cart", error);
  }
};
