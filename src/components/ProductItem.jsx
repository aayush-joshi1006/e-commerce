import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { addToCart } from "../utlis/cartSlice";
import { addToCartAPI } from "../utlis/cartAPI";

import React from "react";

import { toast } from "react-toastify";
import PrivateRoute from "./PrivateRoute";

function ProductItem({ product }) {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate= useNavigate()

  const handleAddToCart = async () => {
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const response = await addToCartAPI(product._id);

      // Extract the item that was just added
      const item = response.data.items.find(
        (item) => item.productId === product._id
      );

      if (item) {
        dispatch(addToCart(item));
        toast.success("Item added to cart");
      } else {
        console.error("Item not found in response:", data);
      }
    } catch (err) {
      console.error("Failed to add to cart:", err);
    }
  };

  return (
    // Component for each item
    <div
      className="flex flex-col justify-between items-center w-full px-3 py-5 
      bg-white dark:bg-gray-800 
      text-gray-900 dark:text-gray-100 
      transition-colors duration-300"
    >
      {/* Product details component */}
      <div className="w-full">
        {/* image of the product */}
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => (e.target.src = "../src/assets/fallback.png")}
          className="transition duration-500 hover:scale-105 w-full h-auto object-cover rounded"
        />
        {/* details of the product */}
        <h2 className="text-center text-lg font-bold mt-3">{product.title}</h2>
        <p className="text-center font-extralight italic">{`$${product.price}`}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-2 mt-6 w-full">
        {/* view details page for that product */}
        <Link
          to={`/product/${product._id}`}
          className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300 text-center w-full sm:w-auto"
        >
          View details
        </Link>
        {/* button to add item to the cart */}

        <button
          onClick={handleAddToCart}
          className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300 text-center w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// useing react.memo so that data is saved in the memory so calculation dont have to made again
export default React.memo(ProductItem);
