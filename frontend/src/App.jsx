import React, { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuthTheme } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthRedirect from "./components/AuthRedirect";

const App = () => {
  const { theme, isLoading } = useAuthTheme();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/login"
          element={
            <AuthRedirect>
              <Login />
            </AuthRedirect>
          }
        />
        <Route
          path="/signup"
          element={
            <AuthRedirect>
              <Signup />
            </AuthRedirect>
          }
        />

        {/* Profile page requires login */}
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toaster />
    </div>
  );
};

export default App;
