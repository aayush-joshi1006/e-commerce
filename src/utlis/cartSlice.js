import { createSlice } from "@reduxjs/toolkit";

// slice function for cart items
const cartSlice = createSlice({
  name: "cartItems",
  initialState: {},
  reducers: {
    // function for adding a item to the cart
    addToCart(state, action) {
      const itemId = action.payload;
      state[itemId] = (state[itemId] || 0) + 1;
    },
    // function for removing an item from the cart
    removeFromCart(state, action) {
      const itemId = action.payload;
      if (state[itemId]) {
        state[itemId] -= 1;
        if (state[itemId] <= 0) {
          delete state[itemId];
        }
      }
    },
    // function for clearing cart completly
    clearCart(state) {
      Object.keys(state).forEach((key) => delete state[key]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
