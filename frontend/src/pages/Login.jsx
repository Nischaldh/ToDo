import { Link, useNavigate } from "react-router-dom";
import { useAuthTheme } from "../context/AuthContext";
import { useState } from "react";
import assets from "../assets/assets.js";

const Login = () => {
  const { theme, login, isLoading } = useAuthTheme();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password });
      if (res.user) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="max-w-sm w-full bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
      >
        {/* Logo & App Name */}
        <div className="text-center mb-6">
          <Link to="/" className="flex items-center justify-center space-x-2">
            <img src={assets.logo} alt="Logo" className="h-10 w-10" />
            <span className="font-bold text-2xl">Todo App</span>
          </Link>
        </div>

        {/* Email */}
        <div className="mb-5">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Password */}
        <div className="mb-5">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full py-2.5 px-4 rounded bg-blue-500 hover:bg-blue-600 text-white font-medium focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isLoading ? `Logging in...` : "Login"}
        </button>

        {/* Signup link */}
        <p className="mt-4 text-center text-sm">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
