import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center text-center 
      bg-white dark:bg-gray-900 
      text-gray-700 dark:text-gray-200 
      transition-colors duration-300
    "
    >
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-[#202020] hover:bg-[#000f9f] text-white px-4 py-2 rounded transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
