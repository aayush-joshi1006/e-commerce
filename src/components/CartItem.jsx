import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../utlis/cartSlice";
import { toast } from "react-toastify";

export default function CartItem({ product }) {
  // getting cart items from the redux store
  const cart = useSelector((store) => store.cart);
  // setting cart item quntity from cart item list else setting to zero if not exists
  const quantity = cart[product.id] || 0;
  // initialzing dispatch function for using functions from store
  const dispatch = useDispatch();

  return (
    // Cart item componet
    <div className="flex flex-col sm:flex-row justify-evenly items-center w-full bg-[#f9f9f9] dark:bg-gray-800 p-3 m-2 gap-4 transition-colors duration-300">
      {/* component for showing item image*/}
      <div className="w-full sm:w-auto flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => (e.target.src = "../src/assets/fallback.png")}
          className="w-40 sm:w-52 object-contain rounded"
        />
      </div>
      {/* component for showing details of the product */}

      <div className="flex flex-col justify-center items-center sm:items-end text-center sm:text-right gap-2 w-full sm:w-[20vw] text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => {
              // using dispatch to remove item from cart using function from redux store
              dispatch(removeFromCart(product.id));
              //  showing nortification showing item is removed from the cart
              toast("Item removed from cart");
            }}
            className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white transition duration-300"
          >
            <FaMinus />
          </button>
          {/* span tag showing quantity of the item in cart */}
          <span className="text-lg font-medium">{quantity}</span>
          {/* button for adding item to the store */}
          <button
            onClick={() => {
              // using dispatch to add item from cart using function from redux store
              dispatch(addToCart(product.id));
              //  showing nortification showing item is added to the cart
              toast("Item added to cart");
            }}
            className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white transition duration-300"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
