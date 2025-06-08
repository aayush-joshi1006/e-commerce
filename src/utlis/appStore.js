import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";

const localCartState = () => {
  try {
    const serialized = localStorage.getItem("cart");
    return serialized ? JSON.parse(serialized) : {};
  } catch (e) {
    console.error("Error while storing to local storage: ", e);
    return {};
  }
};

const saveCartState = (state) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem("cart", serialized);
  } catch (error) {
    console.error("error while setting data in local storage: ", error);
  }
};

const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
  },
  preloadedState: {
    cart: localCartState(),
  },
});

appStore.subscribe(() => {
  saveCartState(appStore.getState().cart);
});

export default appStore;
