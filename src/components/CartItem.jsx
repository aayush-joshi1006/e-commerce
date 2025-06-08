import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../utlis/cartSlice";

export default function CartItem({ product }) {
  const cart = useSelector((store) => store.cart);
  const quantity = cart[product.id] || 0;
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex justify-evenly items-center w-[40vw] bg-[#f9f9f9] p-3 m-2">
        <div className="">
          <img src={product.thumbnail} alt={product.title} className="w-52" />
        </div>
        <div>
          <h2>{product.title}</h2>
          <div className="flex justify-center items-center gap-4">
            <button
              onClick={() => dispatch(removeFromCart(product.id))}
              className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
            >
              <FaMinus />
            </button>
            <span>{quantity}</span>
            <button
              onClick={() => dispatch(addToCart(product.id))}
              className="p-1 rounded-full bg-amber-500 hover:bg-amber-400"
            >
              <FaPlus />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
