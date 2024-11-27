import React from "react";
import styles from "./styles/navbar.module.css";

const Submenu = ({ showMenu, logout }) => {
  return (
    <ul>
      <li
        className="text-sm text-blue-950 hover:bg-gray-200 hover:text-blue-500 cursor-pointer"
        onClick={logout}
      >
        Cerrar Sesión
      </li>
    </ul>
  );
};

export default Submenu;
