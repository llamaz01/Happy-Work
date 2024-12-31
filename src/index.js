import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "../src/components/styles/global-styles.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "../src/contexts/userProvider";
import 'flowbite';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <UserProvider>
      <App /> 
    </UserProvider>
  </React.StrictMode>
);

reportWebVitals();
