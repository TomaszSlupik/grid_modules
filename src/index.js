import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider } from "@mui/material";
import themeColor from "./theme/themeColor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={themeColor}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
);
