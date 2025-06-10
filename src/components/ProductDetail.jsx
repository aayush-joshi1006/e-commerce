import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { FaPlus, FaStar, FaMinus } from "react-icons/fa6";
import { addToCart, removeFromCart } from "../utlis/cartSlice";
import { IoMdArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

export default function ProductDetail() {
  let { id } = useParams();
  let products = useSelector((store) => store.products.data);
  let cart = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  let currentProduct = products.find((product) => product.id === Number(id));
  let quantity = cart[id] || 0;

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
    <div
      className="mt-24 min-h-[85vh] container mx-auto px-4 relative my-5 
      bg-white dark:bg-gray-900 
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
      <Link
        to="/store"
        className="absolute top-2 left-2 flex items-center gap-1 hover:text-[#000f9f] dark:hover:text-blue-400"
      >
        <IoMdArrowBack />
        <span>Back to Store</span>
      </Link>

      <div className="flex flex-col lg:flex-row justify-center items-center gap-10">
        <div>
          <img
            src={currentProduct.thumbnail}
            alt={currentProduct.title}
            onError={(e) => (e.target.src = "../src/assets/fallback.png")}
            className="w-full max-w-md transition duration-500 hover:scale-105"
          />
        </div>

        <div className="flex flex-col items-start w-full max-w-2xl">
          <h2 className="text-2xl md:text-3xl font-bold my-3">
            {currentProduct.title}
          </h2>
          <p className="text-gray-500 dark:text-gray-300 italic text-sm">
            {currentProduct.description}
          </p>

          <div className="flex flex-wrap justify-between items-center w-full px-0 mt-4">
            <div className="flex flex-wrap gap-2 my-3">
              {currentProduct.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 dark:bg-gray-700 px-2 py-1 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 cursor-pointer"
                >
                  {tag}
                </span>
              ))}
            </div>

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

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-center w-full gap-4">
            <button
              onClick={() => {
                dispatch(addToCart(id));
                toast("Item added to cart");
              }}
              className="bg-[#202020] hover:bg-[#000f9f] px-4 py-2 text-white transition duration-300 w-full sm:w-auto"
            >
              Add to Cart
            </button>

            <div className="flex items-center gap-3">
              <button
                disabled={quantity === 0}
                className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 disabled:opacity-40"
                onClick={() => {
                  dispatch(removeFromCart(id));
                  toast("Item removed from cart");
                }}
              >
                <FaMinus />
              </button>
              <span>{quantity}</span>
              <button
                onClick={() => {
                  dispatch(addToCart(id));
                  toast("Item added to cart");
                }}
                className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
              >
                <FaPlus />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
