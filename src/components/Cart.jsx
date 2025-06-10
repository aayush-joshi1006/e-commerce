import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { ToastContainer, toast } from "react-toastify";

export default function Cart() {
  const products = useSelector((store) => store.products.data);
  const cartItems = useSelector((store) => store.cart);
  let navigate = useNavigate();

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
      <div className="container mt-24 mx-auto flex flex-col relative justify-center items-center min-h-[85vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
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
          className="absolute top-2 left-2 flex justify-center items-center gap-1 hover:text-[#000f9f] dark:hover:text-[#4c6ef5] dark:text-white transition-colors duration-300"
        >
          <IoMdArrowBack />
          <span>Back to Store</span>
        </Link>

        {cartProducts.length <= 0 ? (
          <div className="text-red-700 dark:text-red-400 font-bold text-lg text-center px-4">
            Your Cart is Empty. Go back to the store, add something, and come
            back.
          </div>
        ) : (
          <>
            <div className="mt-10 w-full max-w-4xl">
              {cartProducts.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
            </div>

            <div className="flex justify-evenly w-full max-w-4xl items-center p-4 border-t border-gray-300 dark:border-gray-700 mt-6">
              <span className="text-xl font-bold">
                Total: $
                {cartProducts
                  .reduce((acc, cur) => acc + cur.price * cur.quantity, 0)
                  .toFixed(2)}
              </span>

              <button
                className="bg-gray-800 dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-800 text-white px-5 py-2 text-xl transition duration-300"
                onClick={() => {
                  toast("Redirecting to Checkout Page...", {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                  });
                  setTimeout(() => {
                    navigate("/checkout");
                  }, 2000);
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
