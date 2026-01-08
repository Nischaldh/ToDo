import { Link, useNavigate } from "react-router-dom";
import { useAuthTheme } from "../context/AuthContext";
import { useState } from "react";
import assets from "../assets/assets.js";

const Signup = () => {
  const { theme, isLoading, signup } = useAuthTheme();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup({ name, email, password });
      if (res.user) {
        navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

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

        {/* Name */}
        <div className="mb-5">
          <label htmlFor="name" className="block mb-2 text-sm font-medium">
            Name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-gray-900 dark:text-gray-100 text-sm rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
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
          {isLoading ? `Signing up...` : "Sign Up"}
        </button>

        {/* Login link */}
        <p className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
