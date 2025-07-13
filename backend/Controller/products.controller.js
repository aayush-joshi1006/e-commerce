import productModel from "../Model/products.model.js";

// controller for fetching all products from the database
export async function getProducts(req, res) {
  try {
    // getting all products from the database
    const data = await productModel.find();
    // returning products as a response
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// controller for getting a single product
export async function getSingleProduct(req, res) {
  try {
    // getting product from database using product id from the url
    const data = await productModel.findById(req.params.id);
    // in case product is not found
    if (!data) return res.status(404).json({ message: "Product Not Found" });
    // returning current product
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

// posting a product to the database
export async function postProducts(req, res) {
  try {
    // getting product's details from the request body
    const { title, description, price, rating, tags, thumbnail, stock } =
      req.body;
    // in case main data is missing return the message
    if (!title || !description || !price || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    // creating a new product in the database
    const newProduct = new productModel({
      title,
      description,
      price,
      rating,
      tags,
      thumbnail,
      stock,
    });
    // save the changes to the database
    const saved = await newProduct.save();
    // response with the saved product
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Product", error: error.message });
  }
}
