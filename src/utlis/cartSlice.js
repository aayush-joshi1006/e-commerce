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
      const { _id, quantity } = action.payload;
      const index = state.findIndex((item) => item._id === _id);
      if (index !== -1) {
        if (quantity > 0) {
          state[index].quantity = quantity; // set to updated quantity
        } else {
          state.splice(index, 1); // remove item if quantity is 0
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
