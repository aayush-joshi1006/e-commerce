import { createSlice } from "@reduxjs/toolkit";

const products = createSlice({
  name: "products",
  initialState: {
    data: null,
  },
  reducers: {
    addProducts: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { addProducts } = products.actions;
export default products.reducer;
