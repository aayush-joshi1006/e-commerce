import { createSlice } from "@reduxjs/toolkit";

// slice for product list
const products = createSlice({
  name: "products",
  initialState: {
    data: null,
  },
  reducers: {
    // method to add products insode product list
    addProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addProducts } = products.actions;
export default products.reducer;
