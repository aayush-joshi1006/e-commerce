import { useSelector } from "react-redux";
import CartItem from "./CartItem";
import { Link, useNavigate } from "react-router-dom";
import { IoMdArrowBack } from "react-icons/io";
import { toast } from "react-toastify";

export default function Cart() {
  //  getting products list from redux store
  const products = useSelector((store) => store.products.data);
  //  getting cart items from redux store
  const cartItems = useSelector((store) => store.cart);
  //  initializing navigation
  let navigate = useNavigate();

  // getting all the products in cart with there quantity
  // conveting object to array for easy manupulation

  const cartProducts = cartItems.map((item) => {
    return {
      product: products.find((product) => {
        

        return product._id === item.productId;
      }),
      quantity: item.quantity,
    };
  });



  const cartTotal = cartProducts
    .reduce((acc, cur) => acc + cur.product.price * cur.quantity, 0)
    .toFixed(2);

  return (
    <>
      {/* Cart componenet showing all cart items */}
      <section className="container mt-24 mx-auto flex flex-col relative justify-center items-center min-h-[85vh] bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
        {/* Link for routing back to the store */}
        <Link
          to="/store"
          className="absolute top-2 left-2 flex justify-center items-center gap-1 hover:text-[#000f9f] dark:hover:text-[#4c6ef5] dark:text-white transition-colors duration-300"
        >
          <IoMdArrowBack />
          <span>Back to Store</span>
        </Link>
        {/* check if cart is empty and show coresponding message in case it is empty */}
        {cartItems.length <= 0 ? (
          // if the cart is empty show this div tag
          <>
            <div className="text-red-700 dark:text-red-400 font-bold text-lg text-center px-4">
              Your Cart is Empty. Go back to the store, add something, and come
              back.
            </div>
            <Link
              to="/store"
              className="mt-4 inline-block text-blue-600 dark:text-blue-400 underline"
            >
              Browse Products
            </Link>
          </>
        ) : (
          // if cart is not empty show this
          <>
            <div className="mt-10 w-full max-w-4xl">
              {/* mapping in the cart items list */}
              {cartProducts.map((curProduct) => (
                // for showing indivisual Cart item with quantity
                <CartItem key={curProduct.product._id} product={curProduct} />
              ))}
            </div>
            {/* section for toal cost and move to checkout page */}
            <div className="flex justify-evenly w-full max-w-4xl items-center p-4 border-t border-gray-300 dark:border-gray-700 mt-6">
              {/* Calculating total cost of the items */}
              <span className="text-xl font-bold">Total: {cartTotal}</span>
              {/* Button for redirecting to the checkout page */}
              <button
                className="bg-gray-800 dark:bg-blue-700 hover:bg-blue-900 dark:hover:bg-blue-800 text-white px-5 py-2 text-xl transition duration-300"
                onClick={() => {
                  // showing the message for redirecting
                  toast("Redirecting to Checkout Page...");
                  // using setTimeOut to insulating the time taken for moving to checkout
                  setTimeout(() => {
                    // navigating to the checkout page
                    navigate("/checkout");
                  }, 2000);
                }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
}
