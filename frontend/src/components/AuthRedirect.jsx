import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthTheme } from "../context/AuthContext";

const AuthRedirect = ({ children }) => {
  const { isLoggedIn, authChecked } = useAuthTheme();

  if (!authChecked) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRedirect;
