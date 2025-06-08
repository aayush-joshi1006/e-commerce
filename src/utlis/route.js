import { lazy } from "react";

export const HomePage = lazy(() => import("../components/HomePage.jsx"));
export const ProductList = lazy(() => import("../components/ProductList.jsx"));
export const ProductDetail = lazy(() =>
  import("../components/ProductDetail.jsx")
);
export const Cart = lazy(() => import("../components/Cart.jsx"));
export const Checkout = lazy(() => import("../components/Checkout.jsx"));
