import { Link } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../utlis/cartSlice";

export default function ProductItem({ product }) {
  const cart = useSelector((store) => store.cart);
  const quantity = cart[product.id] || 0;
  const dispatch = useDispatch();

  return (
    <div className="flex justify-between items-center flex-col">
      <div>
        <img src={product.thumbnail} alt="" />
        <h2 className="text-center text-lg font-bold">{product.title}</h2>
        <p className="text-center font-extralight italic">{`$${product.price}`}</p>
      </div>
      <div className="flex justify-evenly items-center gap-2 mt-6 w-full">
        <Link
          to={`/product/${product.id}`}
          className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300"
        >
          View details
        </Link>
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
  );
}
