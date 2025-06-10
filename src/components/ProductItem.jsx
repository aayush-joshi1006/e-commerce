import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../utlis/cartSlice";
import React from "react";
import { ToastContainer, toast } from "react-toastify";

function ProductItem({ product }) {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col justify-between items-center w-full px-3 py-5 
      bg-white dark:bg-gray-800 
      text-gray-900 dark:text-gray-100 
      transition-colors duration-300"
    >
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <div className="w-full">
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => (e.target.src = "../src/assets/fallback.png")}
          className="transition duration-500 hover:scale-105 w-full h-auto object-cover rounded"
        />
        <h2 className="text-center text-lg font-bold mt-3">{product.title}</h2>
        <p className="text-center font-extralight italic">{`$${product.price}`}</p>
      </div>

      <div className="flex flex-col sm:flex-row justify-evenly items-center gap-2 mt-6 w-full">
        <Link
          to={`/product/${product.id}`}
          className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300 text-center w-full sm:w-auto"
        >
          View details
        </Link>

        <button
          onClick={() => {
            dispatch(addToCart(product.id));
            toast("Item added to cart", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              theme: "dark",
            });
          }}
          className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300 text-center w-full sm:w-auto"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default React.memo(ProductItem);
