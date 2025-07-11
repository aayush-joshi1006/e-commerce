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
  Login,
  SignUp,
} from "./utlis/route.js";

import ThemeProvider from "./context/ThemeContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

// router method
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
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <SignUp />,
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
        element: (
          <PrivateRoute>
            <Cart />
          </PrivateRoute>
        ),
      },
      {
        path: "/checkout",
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        ),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <>
    {/* for providing redux store to all components inside it */}
    <Provider store={appStore}>
      {/* for providing theme to all componets */}
      <ThemeProvider>
        {/* router component */}
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </>
  // </StrictMode>
);
