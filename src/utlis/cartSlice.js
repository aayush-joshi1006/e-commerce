// import { createSlice } from "@reduxjs/toolkit";

// // slice function for cart items
// const cartSlice = createSlice({
//   name: "cartItems",
//   initialState: {},
//   reducers: {
//     // function for adding a item to the cart
//     addToCart(state, action) {
//       const itemId = action.payload;
//       state[itemId] = (state[itemId] || 0) + 1;
//     },
//     // function for removing an item from the cart
//     removeFromCart(state, action) {
//       const itemId = action.payload;
//       if (state[itemId]) {
//         state[itemId] -= 1;
//         if (state[itemId] <= 0) {
//           delete state[itemId];
//         }
//       }
//     },
//     // function for clearing cart completly
//     clearCart(state) {
//       Object.keys(state).forEach((key) => delete state[key]);
//     },
//   },
// });

// export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
// export default cartSlice.reducer;

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
      const cartItemId = action.payload;
      const index = state.findIndex((item) => item._id === cartItemId);
      if (index !== -1) {
        if (state[index].quantity > 1) {
          state[index].quantity -= 1;
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
