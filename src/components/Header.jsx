import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { TiShoppingCart } from "react-icons/ti";
import { FaMoon, FaSun } from "react-icons/fa6";

export default function Header() {
  // getting cart items from redux store
  const cart = useSelector((store) => store.cart);
  // getting number of items in the cart
  let cartTotal = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  // extracting the state of darkmode and set method for switching dark mode from ThemeContext
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <header>
      <nav className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 fixed top-0 right-0 left-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white p-4 container mx-auto">
        {/* Left - Navigation Links */}
        <div className="flex justify-center items-center gap-6 text-lg mx-3 font-bold">
          <Link
            to="/"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/store"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition duration-300"
          >
            Store
          </Link>
        </div>

        {/* Center - Logo */}
        <div className="flex justify-center items-center gap-1 text-xl font-bold">
          <img
            src="/shopping-icon.png"
            alt="ShoopyGlobe Icon"
            className="w-7"
          />
          <Link
            to="/"
            className="hover:text-blue-700 dark:hover:text-blue-400 transition duration-300"
          >
            ShoppyGlobe
          </Link>
        </div>

        {/* Right - Cart + Toggle */}
        {/* Cart component */}
        <div className="flex justify-center items-center gap-2 mx-3">
          <Link
            to="/cart"
            className="text-3xl p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 relative"
          >
            <TiShoppingCart />
            {cartTotal > 0 && (
              <span className="text-xs rounded-full bg-amber-400 absolute -top-1 -right-1 min-w-[15px] p-0.5 text-center text-black">
                {cartTotal}
              </span>
            )}
          </Link>
          {/* Dark mode toggle button */}
          <button
            onClick={() => setDarkMode((prev) => !prev)}
            className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300"
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
        </div>
      </nav>
    </header>
  );
}
