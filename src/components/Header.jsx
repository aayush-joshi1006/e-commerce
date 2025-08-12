import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";

import { TiShoppingCart } from "react-icons/ti";
import { FaMoon, FaSun } from "react-icons/fa6";
import { logout } from "../utlis/userSlice";
import { clearCart } from "../utlis/cartSlice";
import { CiMenuBurger } from "react-icons/ci";

export default function Header() {
  // state of dropdown menu
  const [isOpen, setIsOpen] = useState(false);
  // getting cart items from redux store
  const cart = useSelector((store) => store.cart);
  // getting number of items in the cart
  let cartTotal = cart.reduce((sum, item) => sum + item.quantity, 0);

  // getting current user
  const user = useSelector((store) => store.user.user);

  // getting prefix of email address
  const username = user?.email?.split("@")[0];

  // extracting the state of darkmode and set method for switching dark mode from ThemeContext
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // dispatch function of Redux store
  const dispatch = useDispatch();
  // navigate function for nevigating etween pages
  const navigate = useNavigate();
  // refrence for the dropdown container
  const dropdownRef = useRef(null);

  // useEffect for closing dropdown after 5 seconds
  useEffect(() => {
    // Close dropdown after 5 seconds
    if (isOpen) {
      const timer = setTimeout(() => setIsOpen(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // closing of dropdown in case any click is made in the web page
  useEffect(() => {
    // Close dropdown on outside click
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    // musedown event handleing for dropdown
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // logout function
  const handleLogout = async () => {
    try {
      // making request to backend for removal of user session
      await fetch("https://e-commerce-vkhx.onrender.com/auth/logout", {
        method: "POST",
        // because cookie-based
        credentials: "include",
      });
      // Clear user from Redux
      dispatch(logout());
      // Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header>
      <nav className="flex justify-between items-center border-b border-gray-300 dark:border-gray-600 fixed top-0 right-0 left-0 z-50 bg-white dark:bg-gray-900 text-black dark:text-white p-4 container mx-auto">
        {/*  Logo */}
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
        {/* navigation menu  */}
        <div className="flex justify-center items-center gap-2 mx-3">
          {username ? (
            `Welcome ${username}`
          ) : (
            // Login button
            <Link
              to="/login"
              className="bg-[#202020] hover:bg-[#000f9f] px-3 py-2 text-white transition duration-300
      dark:bg-[#000f9f] dark:hover:bg-blue-700"
            >
              Login
            </Link>
          )}
          {/* Cart component */}
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
          {/* dropdown menu */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsOpen((prev) => !prev)}
              className="text-2xl p-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
            >
              {/* Menu icon */}
              <CiMenuBurger />
            </button>

            {isOpen && (
              // dropdown menu container
              <ul
                className="absolute right-0  w-40 bg-white dark:bg-gray-800 shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700"
                onClick={() => setIsOpen(false)}
              >
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/store"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                  >
                    Browse
                  </Link>
                </li>
                <li>
                  {/* Logout or login based on if user exists */}
                  {user ? (
                    <span
                      onClick={handleLogout}
                      className="block px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Logout
                    </span>
                  ) : (
                    <Link
                      to="/login"
                      onClick={handleLogout}
                      className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                    >
                      Login
                    </Link>
                  )}
                </li>
              </ul>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
