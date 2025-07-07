// import { configureStore } from "@reduxjs/toolkit";
// import cartReducer from "./cartSlice";
// import productsReducer from "./productsSlice";

// // method for getting cart data from local storage
// const localCartState = () => {
//   try {
//     // getting cart from the local storage
//     const serialized = localStorage.getItem("cart");
//     // return the cart if not available in local storage return empty object
//     return serialized ? JSON.parse(serialized) : {};
//   } catch (e) {
//     // error handling in case we are unable to get data from local storage and return a empty object
//     console.error("Error while storing to local storage: ", e);
//     return {};
//   }
// };

// // function for setting data in the local storage
// const saveCartState = (state) => {
//   try {
//     // getting the current cart item id
//     const serialized = JSON.stringify(state);
//     // setting the cart item id in the local storage
//     localStorage.setItem("cart", serialized);
//   } catch (error) {
//     // error handling in case we are enable to set cart item in local storage
//     console.error("error while setting data in local storage: ", error);
//   }
// };

// //  creating store using redux
// const appStore = configureStore({
//   reducer: {
//     cart: cartReducer,
//     products: productsReducer,
//   },
//   // happens before the store  value is loaded and used for getting data from local storage
//   preloadedState: {
//     cart: localCartState(),
//   },
// });

// // applies after the store is updated
// appStore.subscribe(() => {
//   // used to update value into local storage
//   saveCartState(appStore.getState().cart);
// });

// export default appStore;

import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import productsReducer from "./productsSlice";
import userReducer from "./userSlice";

// creating the store without localStorage
const appStore = configureStore({
  reducer: {
    cart: cartReducer,
    products: productsReducer,
    user: userReducer,
  },
});

export default appStore;
