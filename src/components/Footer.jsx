import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <div className="border border-t-gray-300 flex justify-center border-l-0 p-5 border-r-0 border-b-0 container mx-auto items-center gap-3 flex-col ">
      <div className="flex justify-center items-center gap-2 cursor-pointer">
        <h2 className="text-xl font-bold">ShoppyGlobe</h2>
        <img
          src="../shopping-icon.png"
          alt="ShoppyGlobe Logo"
          className="w-7"
        />
      </div>
      <p> Your one-stop shop for trending product</p>
      <div className="flex justify-evenly items-center w-[60vw]">
        <p>Navigate to:</p>
        <Link className="text-[#000f9f] hover:underline font-semibold" to="/">
          Home
        </Link>
        <Link
          className="text-[#000f9f] hover:underline font-semibold"
          to="/store"
        >
          Store
        </Link>
        <Link
          className="text-[#000f9f] hover:underline font-semibold"
          to="/cart"
        >
          Cart
        </Link>
      </div>
      <div>
        <p className="text-[#000f9f] font-bold">
          &copy; {new Date().getFullYear()} ShoppyGlobe. | All rights reserved.
        </p>
      </div>
    </div>
  );
}
