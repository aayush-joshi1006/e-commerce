import productModel from "../Model/products.model.js";

// export function getProducts(req, res) {
//   productModel
//     .find()
//     .then((data) => {
//       return res.status(200).json(data);
//     })
//     .catch((err) => {
//       return res
//         .status(500)
//         .json({ message: "Internal Server Error", error: err.message });
//     });
// }

// export function getSingleProduct(req, res) {
//   let currentId = req.params.id;
//   productModel
//     .findById(currentId)
//     .then((data) => {
//       if (!data) {
//         return res.status(404).json({ message: "Product Not Found" });
//       }
//       return res.status(200).json(data);
//     })
//     .catch((err) => {
//       return res.status(500).json({
//         message: "Internal Server Error",
//         error: err.message,
//       });
//     });
// }

// export function postProducts(req, res) {
//   const { title, description, price, rating, tags, thumbnail, stock } =
//     req.body;

//   const newProduct = new productModel({
//     title,
//     description,
//     price,
//     rating,
//     tags,
//     thumbnail,
//     stock,
//   });

//   newProduct
//     .save()
//     .then((product) => {
//       return res.status(201).json(product);
//     })
//     .catch((err) => {
//       return res
//         .status(500)
//         .json({ message: "Internal Server Error", error: err.message });
//     });
// }

export async function getProducts(req, res) {
  try {
    const data = await productModel.find();
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export async function getSingleProduct(req, res) {
  try {
    const data = await productModel.findById(req.params.id);
    if (!data) return res.status(404).json({ message: "Product Not Found" });
    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}

export async function postProducts(req, res) {
  try {
    const { title, description, price, rating, tags, thumbnail, stock } =
      req.body;
    if (!title || !description || !price || !stock) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const newProduct = new productModel({
      title,
      description,
      price,
      rating,
      tags,
      thumbnail,
      stock,
    });
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add Product", error: error.message });
  }
}
