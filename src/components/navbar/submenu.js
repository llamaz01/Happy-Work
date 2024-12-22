import React from "react";
import { FaSignOutAlt } from 'react-icons/fa';

const Submenu = ({ showMenu, logout }) => {
  return (
    <ul
      className={`absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded shadow-lg ${showMenu ? "block" : "hidden"
        }`}
    >
      <li
        className="flex items-center text-sm text-purple-600 hover:bg-gray-200 hover:text-purple-950 cursor-pointer p-2"
        onClick={logout}
      >
        <FaSignOutAlt className="mr-2" /> Cerrar Sesión
      </li>

    </ul>
  );
};

export default Submenu;
