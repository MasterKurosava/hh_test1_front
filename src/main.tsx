// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "./context/ThemeContext"; // Импорт ThemeProvider
import "./index.css"; // Tailwind стили
import AppRoutes from "./router/AppRoutes";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
      <AppRoutes />
  </React.StrictMode>
);
