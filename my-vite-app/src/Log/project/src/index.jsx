import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Login } from "./screens/Login";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <Login />
  </StrictMode>,
);