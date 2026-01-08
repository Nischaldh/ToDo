import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthThemeProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { TodoProvider } from "./context/TodoContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <StrictMode>
      <AuthThemeProvider>
        <TodoProvider>
          <App />
        </TodoProvider>
      </AuthThemeProvider>
    </StrictMode>
  </BrowserRouter>
);
