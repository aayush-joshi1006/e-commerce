import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

export default function Header() {
  const cart = useSelector((store) => store.cart);
  let cartTotal = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  return (
    <>
      <div>
        <nav className="flex justify-between items-center border-b-gray-300 border-t-0 border-l-0 border border-r-0 fixed top-0 right-0 left-0 z-10 bg-white p-4 container mx-auto">
          <div className="flex justify-center items-center gap-6 text-lg mx-3 font-bold ">
            <Link
              to="/"
              className="hover:text-blue-700 transition duration-500"
            >
              Home
            </Link>
            <Link
              to="/store"
              className="hover:text-blue-700 transition duration-500"
            >
              Store
            </Link>
          </div>
          <div className="flex justify-center items-center gap-1 text-xl font-bold">
            <img
              src="../public/shopping-icon.png"
              alt="ShoopyGlobe Icon"
              className="w-7"
            />
            <Link
              to="/"
              className="hover:text-blue-700 transition duration-500"
            >
              ShoppyGlobe
            </Link>
          </div>
          <div className="flex justify-center items-center mx-3">
            <Link
              to="/cart"
              className="text-3xl p-1 rounded-full hover:bg-gray-200 relative"
            >
              <TiShoppingCart />
              {cartTotal > 0 && (
                <span className="text-xs rounded-full bg-amber-400 absolute -top-1 -right-1 min-w-[15px] p-0.5 text-center">
                  {cartTotal == 0 ? "" : cartTotal}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
