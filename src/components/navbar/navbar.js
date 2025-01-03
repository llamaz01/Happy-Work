import React, { useState } from "react";
import styles from "./styles/navbar.module.css";
import MobileMenu from "./mobileMenu";
import { useNavigate, Link } from "react-router-dom";
import { useUser } from "../../contexts/userProvider";
import Submenu from "./submenu";
import { FaChevronDown } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useUser();

  const handleMenuClick = (route) => {
    navigate(route);
    setIsOpen(false);
  };

  return (
    <div className={`relative p-4 ${styles.content_nav}`}>
      <nav className="container mx-auto flex justify-between items-center">
        <div className={styles.clickable}>
          <img
            src="/image/logo2.png"
            alt="logo"
            height={250}
            width={150}
            className={`text-2xl font-bold text-white ${styles.fadein}`}
            onClick={() => handleMenuClick("/home")}
          />
        </div>
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
              d={isOpen ? " " : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>

        {/* Menú de navegación */}
        <div className={styles.content_opcions_nav}>
          <ul className="flex md:flex-row md:space-x-12 items-center">
            <li>
              <a
                href="/ranking"
                className={`font-semibold text-base ${styles.text_hover_opcnav}`}
              >
                Ranking
              </a>
            </li>
            <li>
              <Link
                to="/comments"
                className={`font-semibold text-base ${styles.text_hover_opcnav}`}
              >
                Comentarios
              </Link>
            </li>
            {/* <li>
              <Link
                to="/"
                className={`font-semibold text-base ${styles.text_hover_opcnav}`}
              >
                Vacancias
              </Link>
            </li> */}

            <li>
              {user ? (
                <div className="relative">
                  <button
                    className={`flex p-1 items-center font-semibold ${styles.lblNameUser} `}
                    onClick={() => setShowMenu(!showMenu)}
                  >
                    Hola, {user.name}
                    <FaChevronDown className="ml-2" size={14} />
                  </button>
                  {showMenu ? <Submenu showMenu={showMenu} logout={logout} /> : ""}
                </div>
              ) : (
                <div>
                  <button
                    className={`${styles.btn_iniciar_sesion}`}
                    onClick={() => handleMenuClick("/auth/login")}
                  >
                    Iniciar Sesión
                  </button>
                </div>
              )}
            </li>
          </ul>
        </div>
      </nav>
      <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};

export default Navbar;
