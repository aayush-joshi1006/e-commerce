import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";

export default function Cart() {
  const products = useSelector((store) => store.products.data);
  const cartItems = useSelector((store) => store.cart);

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

  return (
    <>
      <div className="container mt-24 mx-auto flex-col relative flex justify-center items-center min-h-[85vh]">
        <Link
          to="/store"
          className="absolute top-2 left-2 flex justify-center items-center gap-1 hover:text-[#000f9f]"
        >
          <IoMdArrowBack />
          <span>Back to Store</span>
        </Link>
        {cartProducts.length <= 0 ? (
          <div className="text-red-800 font-bold text-lg text-center">
            Your Cart is Empty. Go back to the store add something and come back
          </div>
        ) : (
          <>
            <div className="mt-10">
              {cartProducts.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>
            <div className="flex justify-evenly w-full items-center p-4">
              <span className="text-xl font-bold">
                Total:$
                {cartProducts
                  .reduce((acc, cur) => (acc += cur.price * cur.quantity), 0)
                  .toFixed(2)}
              </span>
              <Link
                to="/checkout"
                className="bg-[#202020] text-xl hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300"
              >
                Checkout
              </Link>
            </div>
          </>
        )}
      </div>
    </>
  );
}
