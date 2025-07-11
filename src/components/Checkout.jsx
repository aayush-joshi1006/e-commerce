import { useSelector, useDispatch } from "react-redux";

import { useNavigate, Link } from "react-router-dom";

import { clearCart } from "../utlis/cartSlice";

import { IoMdArrowBack } from "react-icons/io";

import { toast } from "react-toastify";
import { clearCartAPI } from "../utlis/cartAPI";

export default function Checkout() {
  // getting list of all products from redux store
  const products = useSelector((store) => store.products.data);
  // getting cart items from redux store
  const cartItems = useSelector((store) => store.cart);
  // initialzing dispatch hook for using function from redux store
  const dispatch = useDispatch();
  // initialzing navigation from navigating between pages
  const navigate = useNavigate();

  // getting all the items from the cart and adding there qunatities to the item
  // converting object to array for easier access of all items
  const cartProducts = cartItems.map((item) => {
    return {
      product: products.find((product) => product._id === item.productId),
      quantity: item.quantity,
    };
  });

  const cartTotal = cartProducts
    .reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
    .toFixed(2);

  return (
    <>
      {/* Componet for checkout page */}
      <div className="mt-24 container mx-auto relative flex justify-center items-center flex-col min-h-[90vh] px-4">
        {/* Link for navigating back to the cart page */}
        <Link
          to="/cart"
          className="absolute top-2 left-2 flex justify-center items-center gap-1 hover:text-[#000f9f] dark:hover:text-[#4c6ef5] dark:text-white transition-colors duration-300"
        >
          <IoMdArrowBack />
          <span>Back to Cart</span>
        </Link>
        {/* Componet showing all the items in the cart with there details */}
        <div className="w-full flex flex-col items-center mt-10">
          {/* mapping to all cart items */}
          {cartProducts.map((curProduct) => (
            // indivisual item in the cart
            <div
              key={curProduct.product._id}
              className="flex flex-col sm:flex-row justify-evenly items-center w-full sm:w-[40vw] p-3 m-2 bg-[#f9f9f9] dark:bg-gray-800 gap-4 transition-colors duration-300"
            >
              {/* product image */}
              <div className="flex justify-center">
                <img
                  src={curProduct.product.thumbnail}
                  className="w-40 sm:w-44 rounded"
                  alt={curProduct.product.title}
                  onError={(e) => (e.target.src = "/src/assets/fallback.png")}
                />
              </div>
              {/* product detaisl */}
              <div className="flex flex-col items-center sm:items-end text-center sm:text-right w-full sm:w-[20vw] gap-2 text-gray-900 dark:text-gray-100">
                <p className="text-lg font-bold">{curProduct.product.title}</p>
                <p className="font-thin italic">
                  {curProduct.quantity} × ${curProduct.product.price}
                </p>
                <div className="h-0.5 w-[80%] bg-gray-300 dark:bg-gray-600 rounded" />
                <p>
                  Total: $
                  {(curProduct.quantity * curProduct.product.price).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        {/* total cost of the products and checkout button */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 w-full sm:w-[40vw] gap-4">
          {/* componet showung total amount  */}
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Total: ${cartTotal}
          </span>
          {/* button for payng the amount */}
          <button
            className="bg-gray-800 dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-800 text-white px-5 py-2 text-xl transition duration-300"
            onClick={() => {
              // Show toast notification
              toast("Payment successful! Redirecting to store...");

              // Simulate delay for payment processing
              setTimeout(async () => {
                try {
                  // Clear cart in DB
                  await clearCartAPI();

                  // Clear cart in Redux store
                  dispatch(clearCart());
                } catch (error) {
                  console.error("Failed to clear cart:", error.message);
                  // Optional: show an error toast or fallback
                }

                // Navigate after cart has been cleared
                navigate("/store");
              }, 2000);
            }}
          >
            Pay Amount
          </button>
        </div>
      </div>
    </>
  );
}
