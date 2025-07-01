export function cartRoutes(app) {
  app.post("/cart", addToCart);
  app.put("/cart", updateCart);
  app.delete("/cart/:id", removeFromCart);
}
