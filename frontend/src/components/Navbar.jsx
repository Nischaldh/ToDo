import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useAuthTheme } from "../context/AuthContext";
import { Home, LogOut, User, Menu, Sun, Moon } from "lucide-react";
import assets from "../assets/assets.js";

const Navbar = () => {
  const { isLoggedIn, user, logout, theme, toggleTheme } = useAuthTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`fixed w-full z-20 top-0 border-b ${
        theme === "dark"
          ? "bg-gray-900 text-white border-gray-700"
          : "bg-white text-black border-gray-200"
      }`}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center p-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img src={assets.logo} alt="Logo" className="h-10 w-10" />
          <span className="font-bold text-lg">TODO</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6 items-center">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-1 hover:text-blue-500 transition-colors"
            >
              <Home size={18} /> <span>Home</span>
            </Link>
          </li>

          {/* Theme toggle */}
          <li>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              title="Toggle Theme"
            >
              {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </li>

          {/* Auth / Avatar */}
          {!isLoggedIn ? (
            <li>
              <Link
                to="/login"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Log In
              </Link>
            </li>
          ) : (
            <li className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen((prev) => !prev)}
                className="flex items-center space-x-2 rounded-full hover:ring-2 hover:ring-blue-500 p-1 transition-all"
              >
                <img
                  src={user?.profilePic || "https://i.pravatar.cc/40"}
                  alt="avatar"
                  className="h-8 w-8 rounded-full object-cover"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700 z-20">
                  {/* User Info */}
                  <div className="px-4 py-3 border-b dark:border-gray-700">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user?.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {user?.email}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <Link
                    to="/profile"
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                  >
                    <User size={16} className="mr-2" /> Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 w-full text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors border-t dark:border-gray-700"
                  >
                    <LogOut size={16} className="mr-2" /> Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          onClick={toggleMobileMenu}
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden px-4 pb-4 space-y-2 border-t ${
            theme === "dark"
              ? "bg-gray-900 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Home */}
          <Link
            to="/"
            onClick={() => setIsMobileMenuOpen(false)}
            className="flex items-center space-x-2 px-4 py-3 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            <Home size={18} />
            <span>Home</span>
          </Link>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="flex items-center space-x-2 px-4 py-3 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
            <span>{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
          </button>

          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center space-x-2 px-4 py-3 w-full rounded bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              <User size={18} />
              <span>Log In</span>
            </Link>
          ) : (
            <>
              {/* User Info in Mobile */}
              <div className="px-4 py-3 border-t border-b dark:border-gray-700">
                <p className="text-sm font-medium">{user?.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                  {user?.email}
                </p>
              </div>

              <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center space-x-2 px-4 py-3 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <User size={18} />
                <span>Profile</span>
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 px-4 py-3 w-full rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
