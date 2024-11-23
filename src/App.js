import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { history } from "./components/utils/history";

import "./App.css";
import "./index.css";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";

function App() {
  return (
    <Router history={history}>
      <div>
        <Navbar /> {/* Navbar debe estar fuera de Routes */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/about" element={<h1>Acerca de</h1>} />
          <Route path="/contact" element={<h1>Contacto</h1>} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
