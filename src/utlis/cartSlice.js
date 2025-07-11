import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    setCart(state, action) {
      return action.payload; // set the full cart list from DB
    },
    addToCart(state, action) {
      const { _id, productId, quantity } = action.payload;
      const item = state.find((item) => item.productId === productId);
      if (item) {
        item.quantity += 1;
      } else {
        state.push({ _id, productId, quantity });
      }
    },
    removeFromCart(state, action) {
      const { productId, quantity } = action.payload;
      const index = state.findIndex((item) => item.productId === productId);
      if (index !== -1) {
        if (quantity > 0) {
          state[index].quantity = quantity;
        } else {
          state.splice(index, 1);
        }
      }
    },
    clearCart() {
      return [];
    },
  },
});

export const { setCart, addToCart, removeFromCart, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
