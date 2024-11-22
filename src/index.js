import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "../src/contexts/userProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <App /> {/* App ya incluye el Router */}
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
