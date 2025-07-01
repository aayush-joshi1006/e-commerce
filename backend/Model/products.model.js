import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  tags: [String],
  thumbnail: String,
  stock: Number,
});

const productModel = mongoose.model("products", productSchema);

export default productModel;
