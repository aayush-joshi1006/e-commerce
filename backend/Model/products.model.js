import mongoose from "mongoose";

// designing product schema
const productSchema = mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  rating: Number,
  tags: [String],
  thumbnail: String,
  stock: Number,
});

// creating schema in database
const productModel = mongoose.model("products", productSchema);

export default productModel;
