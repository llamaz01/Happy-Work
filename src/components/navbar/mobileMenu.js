import React from "react";

import { useNavigate } from "react-router-dom";
import styles from "./styles/navbar.module.css";
const MobileMenu = ({ isOpen, setIsOpen }) => {
  const navigate = useNavigate();

  const handleMenuClick = (route) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full h-full z-50 bg-gray-800 bg-opacity-90 bg-colorPrimario transform  ${
          isOpen ? "" : "-translate-x-full"
        } transition-transform duration-500 overflow-y-hidden ${
          styles.hiddenOnLarge
        }`}
      >
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            ></path>
          </svg>
        </button>

        <div className="flex flex-col text-white gap-y-3 textsml mx-6 mt-16">
          <button
            className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105 font-semibold hover:text-blue-700 text-white"
            onClick={() => handleMenuClick("/ranking")}
          >
            Ranking
          </button>
          <button
            className="flex items-center  gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105 font-semibold hover:text-blue-700 text-white"
            onClick={() => handleMenuClick("/comentarios")}
          >
            Comentarios
          </button>
          <button
            className="flex items-center gap-x-2 py-2 border-b border-lineColorBorder transform transition-all duration-300 hover:scale-105 font-semibold hover:text-blue-700 text-white"
            onClick={() => handleMenuClick("/empresas")}
          >
            Empresas
          </button>

          <button
            className="bg-transparent hover:bg-blue-500 text-white font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded"
            onClick={() => handleMenuClick("/auth/login")}
          >
            Iniciar Sesión
          </button>
        </div>

        <div className="absolute bottom-4 left-4"></div>

        <button
          className="absolute top-4 right-4 text-white"
          onClick={() => setIsOpen(false)}
        ></button>
      </div>
    </div>
  );
};

export default MobileMenu;
