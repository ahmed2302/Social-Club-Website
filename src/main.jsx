import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import LoadingProvider from "./Context/loadingContext.jsx";
import SideBarProvider from "./Context/SideBarContext.jsx";
import "./index.css";
import AlertProvider from "./Context/AlertContext.jsx";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AlertProvider>
      <SideBarProvider>
        <LoadingProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </LoadingProvider>
      </SideBarProvider>
    </AlertProvider>
  </React.StrictMode>
);
