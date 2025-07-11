import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";

import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart } from "../utlis/cartSlice";
import { addToCartAPI, removeFromCartAPI } from "../utlis/cartAPI";
import { toast } from "react-toastify";

export default function CartItem({ product }) {
  // getting cart items from the redux store

  const cart = useSelector((store) => store.cart);
  // setting cart item quntity from cart item list else setting to zero if not exists
  // const quantity = cart[product.id] || 0;
  // initialzing dispatch function for using functions from store
  const dispatch = useDispatch();

  const handleRemoveFromCart = async () => {
    try {
      // Pass the productId (id from useParams), not cartItem._id
      const response = await removeFromCartAPI(product.product._id);

      // Check for the correct response structure
      if (response.message === "Cart updated") {
        // Dispatch with productId, not cartItem._id
        dispatch(
          removeFromCart({
            productId: product.product._id,
            quantity: product.quantity - 1,
          })
        );
        toast.success("Item removed from cart");
      } else {
        toast.error("Failed to remove item");
      }
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Error occurred");
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await addToCartAPI(product.product._id);

      // Extract the item that was just added
      const item = response.data.items.find(
        (item) => item.productId === product.product._id
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
    // Cart item componet
    <div className="flex flex-col sm:flex-row justify-evenly items-center w-full bg-[#f9f9f9] dark:bg-gray-800 p-3 m-2 gap-4 transition-colors duration-300">
      {/* component for showing item image*/}
      <div className="w-full sm:w-auto flex justify-center">
        <img
          src={product.product.thumbnail}
          alt={product.product.title}
          onError={(e) => (e.target.src = "../src/assets/fallback.png")}
          className="w-40 sm:w-52 object-contain rounded"
        />
      </div>
      {/* component for showing details of the product */}

      <div className="flex flex-col justify-center items-center sm:items-end text-center sm:text-right gap-2 w-full sm:w-[20vw] text-gray-900 dark:text-gray-100">
        <h2 className="text-lg font-semibold">{product.product.title}</h2>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={handleRemoveFromCart}
            className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white transition duration-300"
          >
            <FaMinus />
          </button>
          {/* span tag showing quantity of the item in cart */}
          <span className="text-lg font-medium">{product.quantity}</span>
          {/* button for adding item to the store */}
          <button
            onClick={handleAddToCart}
            className="p-1 rounded-full bg-amber-500 hover:bg-amber-400 text-white transition duration-300"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
