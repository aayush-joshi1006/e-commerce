import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../utlis/cartSlice";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function Checkout() {
  const products = useSelector((store) => store.products.data);
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartProducts = Object.entries(cartItems).reduce(
    (acc, [id, quantity]) => {
      let item = products.find((product) => product.id == parseInt(id));
      if (item) {
        acc.push({ ...item, quantity });
      }
      return acc;
    },
    []
  );

  if (cartProducts.length <= 0) {
    navigate("/");
  }

  return (
    <>
      <div className="mt-24 container mx-auto relative flex justify-center items-center flex-col min-h-[90vh] px-4">
        <Link
          to="/cart"
          className="absolute top-2 left-2 flex justify-center items-center gap-1 hover:text-[#000f9f]"
        >
          <IoMdArrowBack />
          <span>Back to Cart</span>
        </Link>

        <div className="w-full flex flex-col items-center mt-10">
          {cartProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col sm:flex-row justify-evenly items-center w-full sm:w-[40vw] p-3 m-2 bg-[#f9f9f9] gap-4"
            >
              <div className="flex justify-center">
                <img
                  src={product.thumbnail}
                  className="w-40 sm:w-44"
                  alt={product.title}
                  onError={(e) => (e.target.src = "../src/assets/fallback.png")}
                />
              </div>

              <div className="flex flex-col items-center sm:items-end text-center sm:text-right w-full sm:w-[20vw] gap-2">
                <p className="text-lg font-bold">{product.title}</p>
                <p className="font-thin italic">
                  {product.quantity} × ${product.price}
                </p>
                <div className="h-0.5 w-[80%] bg-gray-300"></div>
                <p>Total: ${(product.quantity * product.price).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-center p-4 w-full sm:w-[40vw] gap-4">
          <span className="text-xl font-bold">
            Total: $
            {cartProducts
              .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
              .toFixed(2)}
          </span>
          <button
            className="bg-[#202020] text-xl hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300"
            onClick={() => {
              dispatch(clearCart());
              navigate("/store");
            }}
          >
            Pay Amount
          </button>
        </div>
      </div>
    </>
  );
}
