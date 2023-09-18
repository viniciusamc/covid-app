import React from "react";
import "./index.css";
import ReactDOM from "react-dom";
import CssBaseline from "@mui/material/CssBaseline";
import { AppRoutes } from "./routes";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <AppRoutes />
  </React.StrictMode>,
);

