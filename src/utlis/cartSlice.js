import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartItems",
  initialState: {},
  reducers: {
    addToCart(state, action) {
      const itemId = action.payload;
      state[itemId] = (state[itemId] || 0) + 1;
    },
    removeFromCart(state, action) {
      const itemId = action.payload;
      if (state[itemId]) {
        state[itemId] -= 1;
        if (state[itemId] <= 0) {
          delete state[itemId];
        }
      }
    },
    clearCart(state) {
      Object.keys(state).forEach((key) => delete state[key]);
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
