import React, { useState, useEffect } from "react";
import styles from "./styles/navbar.module.css";
import MobileMenu from "./mobileMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    console.log("El estado de isOpen es:", isOpen);
  }, [isOpen]);

  return (
    <div className="bg-slate-600 p-3">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Happy Work</h1>

        {/* Botón de menú para móviles */}
        <button
          className={`${styles.hamburger_menu} text-white md:hidden`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Ícono de menú hamburguesa */}
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
              d={isOpen ? "" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Menú de navegación */}
        <div className={styles.content_opcions_nav}>
          <ul className="flex flex-col md:flex-row md:space-x-12 space-y-2 md:space-y-0 text-center">
            <li>
              <a
                href="#ranking"
                className="font-semibold hover:text-blue-700 text-blue-950"
              >
                Ranking
              </a>
            </li>
            <li>
              <a
                href="#comentarios"
                className="font-semibold hover:text-blue-700 text-blue-950"
              >
                Comentarios
              </a>
            </li>
            <li>
              <a
                href="#empresas"
                className="font-semibold hover:text-blue-700 text-blue-950"
              >
                Empresas
              </a>
            </li>
            <li>
              <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-8 border border-blue-500 hover:border-transparent rounded">
                Iniciar Sesión
              </button>
            </li>
          </ul>
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
