import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import MainRouter from "./Router/MainRouter.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <MainRouter />
  </React.StrictMode>
);
