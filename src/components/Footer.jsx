import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // Footer component
    <footer
      className="border border-t-gray-300 flex justify-center border-l-0 p-5 border-r-0 border-b-0 container mx-auto items-center gap-3 flex-col
      bg-white dark:bg-gray-900
      text-gray-900 dark:text-gray-100
      transition-colors duration-300
    "
    >
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <h2 className="text-xl font-bold">ShoppyGlobe</h2>
        {/* ShoppyGlobe logo */}
        <img
          src="/shopping-icon.png"
          alt="ShoppyGlobe Logo"
          className="w-7"
          onError={(e) => (e.target.src = "/fallback.png")}
        />
      </div>

      <p>Your one-stop shop for trending products</p>

      {/* page navigation links */}
      <div className="flex justify-evenly items-center w-[60vw] flex-wrap gap-3 text-sm sm:text-base">
        <p className="font-medium">Navigate to:</p>
        <Link
          className="text-[#000f9f] dark:text-[#4c6ef5] hover:underline font-semibold transition-colors duration-300"
          to="/"
        >
          Home
        </Link>
        <Link
          className="text-[#000f9f] dark:text-[#4c6ef5] hover:underline font-semibold transition-colors duration-300"
          to="/store"
        >
          Store
        </Link>
        <Link
          className="text-[#000f9f] dark:text-[#4c6ef5] hover:underline font-semibold transition-colors duration-300"
          to="/cart"
        >
          Cart
        </Link>
      </div>

      <div>
        <p className="text-[#000f9f] dark:text-[#4c6ef5] font-bold transition-colors duration-300">
          &copy; {new Date().getFullYear()} ShoppyGlobe. | All rights reserved.
        </p>
      </div>
    </footer>
  );
}
