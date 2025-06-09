import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-center">
      <h1 className="text-5xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-lg text-gray-700 mb-6">Oops! Page not found.</p>
      <Link
        to="/"
        className="bg-[#202020] hover:bg-[#000f9f] text-white px-4 py-2 rounded transition duration-300"
      >
        Go back to Home
      </Link>
    </div>
  );
}
