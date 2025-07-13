import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../utlis/userSlice";

export default function Login() {
  // state for managing email
  const [email, setEmail] = useState("");
  // state for managing password entered
  const [password, setPassword] = useState("");
  // dispatch function of redux
  const dispatch = useDispatch();
  // navigation method for navigation between pages
  const navigate = useNavigate();

  // getting loading state and error for user
  const { loading, error } = useSelector((store) => store.user);

  // Submit button function
  const handleSubmit = async (e) => {
    // preventing default functionality
    e.preventDefault();
    // sending POST request to backend for autherization
    const result = await dispatch(loginUser({ email, password }));
    // if login successful navigate to homepage
    if (loginUser.fulfilled.match(result)) {
      navigate("/");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-gray-800  shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-6 text-center">
          Log In
        </h2>
        {/* for showing error */}
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {/* form for credential submition */}
        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Email component */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="your@email.com"
            />
          </div>
          {/* password component */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
              placeholder="••••••••"
            />
          </div>

          {/* <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-gray-300 dark:border-gray-600 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                Remember me
              </span>
            </label>
            <a
              href="#"
              className="text-sm text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400"
            >
              Forgot password?
            </a>
          </div> */}
          {/* Submit botton */}
          <button
            type="submit"
            disabled={loading || !email || !password}
            className="w-full bg-[#000f9f] hover:bg-blue-700 text-white font-medium py-2.5  transition-colors"
          >
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>
        {/* Sign In option */}
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 hover:text-indigo-500 dark:hover:text-indigo-400 font-medium"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
