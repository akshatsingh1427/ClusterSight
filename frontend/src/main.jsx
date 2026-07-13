import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from "react-hot-toast";

import "./index.css";
import "./styles/App.css";
import "./styles/Dashboard.css";
import "./styles/yamlViewer.css";
import "./styles/Loader.css";

import App from "./App.jsx";

import socket from "./services/socket";

socket.on("connect", () => {
  console.log("Connected:", socket.id);
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 2500,
          style: {
            background: "#1f2937",
            color: "#ffffff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <App />
    </>
  </StrictMode>
);