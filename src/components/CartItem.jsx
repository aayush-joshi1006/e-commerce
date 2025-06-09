import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../utlis/cartSlice";
import { ToastContainer, toast } from "react-toastify";

export default function CartItem({ product }) {
  const cart = useSelector((store) => store.cart);
  const quantity = cart[product.id] || 0;
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col sm:flex-row justify-evenly items-center sm:w-[40vw] w-full bg-[#f9f9f9] p-3 m-2 gap-4">
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
        theme="light"
      />
      <div className="w-full sm:w-auto flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => (e.target.src = "../src/assets/fallback.png")}
          className="w-40 sm:w-52 object-contain"
        />
      </div>

      <div className="flex flex-col justify-center items-end text-center sm:text-right sm:items-end gap-2 w-full sm:w-[20vw]">
        <h2 className="text-lg font-semibold">{product.title}</h2>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={() => {
              dispatch(removeFromCart(product.id));
              toast("Item removed from cart", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
              });
            }}
            className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
          >
            <FaMinus />
          </button>
          <span>{quantity}</span>
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
                progress: undefined,
                theme: "dark",
              });
            }}
            className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
          >
            <FaPlus />
          </button>
        </div>
      </div>
    </div>
  );
}
