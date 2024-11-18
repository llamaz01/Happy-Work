import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";
import Navbar from "./components/navbar/navbar";
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Navbar debe estar fuera de Routes */}
        <Routes>
          {/* Aquí defines tus rutas */}
          <Route path="/auth/login" element={<Login/>}/>;
          <Route path="/" element={<h1>Inicio</h1>} />
          <Route path="/about" element={<h1>Acerca de</h1>} />
          <Route path="/contact" element={<h1>Contacto</h1>} />
          <Route path="/auth/register" element={<Register/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
