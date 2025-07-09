// import { addToCart, removeFromCart, clearCart } from "./cartSlice";

// export const addToCartAsync = (itemId) => async (dispatch, getState) => {
//   let yourToken = getState().user.token;
//   try {
//     await fetch("http://localhost:8080/cart", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${yourToken}`, // Include this if needed
//       },
//       body: JSON.stringify({ productId: itemId, quantity: 1 }),
//     });
//     console.log(yourToken);

//     dispatch(addToCart(itemId));
//   } catch (error) {
//     console.error("Failed to add item to cart ", error);
//   }
// };

// export const removeFromCartAsync = (itemId) => async (dispatch, getState) => {
//   let yourToken = getState().user.token;
//   try {
//     await fetch(`http://localhost:8080/cart/${itemId}`, {
//       method: "DELETE",
//       headers: {
//         Authorization: `Bearer ${yourToken}`,
//       },
//     });
//     console.log(yourToken);

//     dispatch(removeFromCart(itemId));
//   } catch (error) {
//     console.error("Failed to remove item from cart", error);
//   }
// };

// export const clearCartAsync = () => async (dispatch) => {
//   try {
//     await fetch("http://localhost:8080/cart/clear", {
//       method: "DELETE",
//     });

//     dispatch(clearCart());
//   } catch (error) {
//     console.error("Failed to clear cart", error);
//   }
// };

import { addToCart, removeFromCart, setCart } from "./cartSlice";

// Add to cart thunk
export const addToCartAsync = (productId) => async (dispatch) => {
  try {
    const res = await fetch("http://localhost:4040/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId }),
    });

    const newCartItem = await res.json();

    dispatch(addToCart(newCartItem));
  } catch (error) {
    console.error("Error adding to cart:", error);
  }
};

// Remove from cart thunk
export const removeFromCartAsync = (cartItemId) => async (dispatch) => {
  try {
    const res = await fetch(`http://localhost:4040/cart/${cartItemId}`, {
      method: "DELETE",
    });

    if (res.ok) {
      dispatch(removeFromCart(cartItemId));
    }
  } catch (error) {
    console.error("Error removing from cart:", error);
  }
};
