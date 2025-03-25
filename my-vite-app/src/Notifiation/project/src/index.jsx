import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { FrameScreen } from "./screens/FrameScreen";

createRoot(document.getElementById("app")).render(
  <StrictMode>
    <FrameScreen />
  </StrictMode>,
);