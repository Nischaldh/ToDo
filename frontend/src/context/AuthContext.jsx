import { createContext, useContext, useState, useEffect } from "react";
import authService from "../service/auth.service.js";
import toast from "react-hot-toast";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthThemeContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuthTheme = () => useContext(AuthThemeContext);

export const AuthThemeProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  /* -------------------- THEME -------------------- */
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  /* -------------------- CHECK AUTH -------------------- */
  useEffect(() => {
    const getMe = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthChecked(true);
        return;
      }
      try {
        setIsLoading(true);
        const res = await authService.getMe();
        setUser(res.user);
        setIsLoggedIn(true);
      } catch {
        setUser(null);
        setIsLoggedIn(false);
      } finally {
        setIsLoading(false);
        setAuthChecked(true);
      }
    };

    getMe();
  }, []);


  const signup = async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.signup(data);
      setUser(res.user);
      setIsLoggedIn(true);
      toast.success("Signup successful");
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.login(data);
      setUser(res.user);
      setIsLoggedIn(true);
      if (res.token) {
        localStorage.setItem("token", res.token);
      }
      toast.success("Login successful");
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      toast.success("Logged out");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editProfile = async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.editProfile(data);
      setUser(res.user);
      toast.success("Profile updated");
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadProfile = async (file) => {
    setIsLoading(true);
    try {
      const res = await authService.uploadProfile(file);
      setUser(res.user);
      toast.success("Profile picture updated");
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const changePassword = async (data) => {
    setIsLoading(true);
    try {
      const res = await authService.changePassword(data);
      toast.success("Password changed");
      return res;
    } catch (error) {
      toast.error(error.message);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthThemeContext.Provider
      value={{
        user,
        isLoggedIn,
        theme,
        isLoading,
        toggleTheme,
        signup,
        login,
        logout,
        editProfile,
        uploadProfile,
        changePassword,
        authChecked
      }}
    >
      {children}
    </AuthThemeContext.Provider>
  );
};
