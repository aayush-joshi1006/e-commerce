import { useDispatch, useSelector } from "react-redux";

import { useParams, Link } from "react-router-dom";

import { FaPlus, FaStar, FaMinus } from "react-icons/fa6";
import { IoMdArrowBack } from "react-icons/io";

import { addToCart, removeFromCart } from "../utlis/cartSlice";
import { addToCartAPI, removeFromCartAPI } from "../utlis/cartAPI";

import { toast } from "react-toastify";

import { useMemo, useEffect } from "react";

export default function ProductDetail() {
  // getting id of the utem from url
  let { id } = useParams();
  // getting list of products from the redux store
  let products = useSelector((store) => store.products.data);
  // getting list of items in the cart
  let cart = useSelector((store) => store.cart);
  // innitializing dispatch function for using functions from redux store
  const dispatch = useDispatch();

  // finding the current product by matching id from url to hte product list
  const currentProduct = useMemo(() => {
    return products?.find((product) => product._id === id);
  }, [products, id]);
  // setting value of quantity to zero if  it is not there in cart
  let cartItem = cart.find((item) => item.productId === id);

  let quantity = cartItem ? cartItem.quantity : 0;
  // let quantity = cart[id] || 0;

  // giving product not found message in case the id does not matches
  if (!currentProduct) {
    return (
      <div className="mt-24 min-h-[85vh] flex justify-center items-center bg-white dark:bg-gray-900 transition-colors duration-300">
        <p className="text-2xl text-red-500 font-semibold dark:text-red-400">
          Product not found
        </p>
      </div>
    );
  }

  return (
    // Product details comoponent
    <section
      className="mt-24 min-h-[85vh] container mx-auto px-4 relative my-5 
      bg-white dark:bg-gray-900 
      text-gray-900 dark:text-gray-100 
      transition-colors duration-300 flex justify-center items-center"
    >
      {/* going back to the store Link */}
      <Link
        to="/store"
        className="absolute top-2 left-2 flex items-center gap-1 hover:text-[#000f9f] dark:hover:text-blue-400"
      >
        <IoMdArrowBack />
        <span>Back to Store</span>
      </Link>
      {/* Product Detalis */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        {/* Image of the product */}
        <div>
          <img
            src={currentProduct.thumbnail}
            alt={currentProduct.title}
            // error handling in case the image does not load
            onError={(e) => (e.target.src = "../src/assets/fallback.png")}
            className="w-full max-w-md transition duration-500 hover:scale-105"
          />
        </div>
        {/* details about the product */}
        <div className="flex flex-col items-start w-full max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold my-3">
            {currentProduct.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 italic text-sm">
            {currentProduct.description}
          </p>

          <div className="flex flex-wrap justify-between items-center w-full px-0 mt-4">
            <div className="flex flex-wrap gap-2 my-3">
              {/* mapping tags present in the poduct tag list */}
              {currentProduct.tags?.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>
            {/* rating of the product */}
            <div className="flex items-center gap-1 cursor-pointer">
              <FaStar className="text-orange-500" />
              <span>{currentProduct.rating}/5</span>
            </div>
          </div>

          <div className="mt-2">
            <span className="font-thin italic text-lg">
              ${currentProduct.price}
            </span>
          </div>
          {/* Button for adding and removing product from cart */}
          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center w-full gap-4">
            {/* button for adding item to the cart */}
            <button
              onClick={async () => {
                try {
                  const response = await addToCartAPI(id);

                  // Extract the item that was just added
                  const item = response.data.items.find(
                    (item) => item.productId === id
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
              }}
              className="bg-[#202020] hover:bg-[#000f9f] px-4 py-2 text-white transition duration-300 w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <div className="flex items-center gap-3">
              {/* remove from cart button */}
              <button
                // button disabled when the cart is empty
                disabled={quantity === 0}
                className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40"
                onClick={async () => {
                  try {
                    // Pass the productId (id from useParams), not cartItem._id
                    const response = await removeFromCartAPI(id);

                    // Check for the correct response structure
                    if (response.message === "Cart updated") {
                      // Dispatch with productId, not cartItem._id
                      dispatch(removeFromCart(id));
                      toast.success("Item removed from cart");
                    } else {
                      toast.error("Failed to remove item");
                    }
                  } catch (err) {
                    console.error("Error removing from cart:", err);
                    toast.error("Error occurred");
                  }
                }}
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={async () => {
                  try {
                    const response = await addToCartAPI(id);

                    // Extract the item that was just added
                    const item = response.data.items.find(
                      (item) => item.productId === id
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
                }}
                className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
