import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./index.css";
import Navbar from "./components/navbar/navbar";
import Home from "./components/home/home";

function App() {
  return (
    <Router>
      <div>
        <Navbar />  {/* Navbar debe estar fuera de Routes */}
        <Routes>
          {/* Aquí defines tus rutas */}
          <Route path="/home" element={<Home/>} />
          <Route path="/about" element={<h1>Acerca de</h1>} />
          <Route path="/contact" element={<h1>Contacto</h1>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
