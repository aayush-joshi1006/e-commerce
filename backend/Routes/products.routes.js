import {
  getProducts,
  getSingleProduct,
  postProducts,
} from "../Controller/products.controller.js";

export function productRoutes(app) {
  app.get("/api/products", getProducts);
  app.get("/api/products/:id", getSingleProduct);
  app.post("/api/product", postProducts);
}
