import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css";
import App from "./App.jsx";
import { RouterProvider } from "react-router";

import { createBrowserRouter } from "react-router-dom";

import NotFound from "./components/NotFound.jsx";

import { Provider } from "react-redux";
import appStore from "./utlis/appStore.js";

import {
  HomePage,
  ProductDetail,
  ProductList,
  Cart,
  Checkout,
} from "./utlis/route.js";
import ThemeProvider from "./context/ThemeContext.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/store",
        element: <ProductList />,
      },
      {
        path: "/product/:id",
        element: <ProductDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={appStore}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
