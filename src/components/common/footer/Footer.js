import React from 'react';
import styles from "./styles/footer.module.css";
import { FaFacebook, FaTwitter, FaInstagram, FaEnvelope } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className={`text-white mt-10 ${styles.bg_footer}`}>
            <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6 ">
                {/* Sección 1: Sobre Nosotros */}
                <div>
                    <h4 className="text-xl font-bold mb-4 text-center mt-5">Sobre Nosotros</h4>
                    <p className="text-sm text-gray-300 text-center">
                        Somos una plataforma dedicada a conectar personas con empresas de confianza, ayudándote a construir un futuro laboral exitoso.
                    </p>
                </div>

                {/* Sección 2: Enlaces Útiles */}
                <div>
                    <h4 className="text-xl font-bold mb-4 text-center mt-5">Navega por nuestras opciones</h4>
                    <ul className="flex items-center justify-evenly text-center">
                        <li>
                            <a href="/home" className="hover:text-purple-950">Inicio</a>
                        </li>
                        <li>
                            <a href="/ranking" className="hover:text-purple-950">Empresas</a>
                        </li>
                        <li>
                            <a href="/comments" className="hover:text-purple-950">Comentarios</a>
                        </li>
                        <li>
                            <a href="/vacancy" className="hover:text-purple-950">Vacancias</a>
                        </li>
                    </ul>
                </div>

                {/* Sección 3: Redes Sociales */}
                <div>
                    <h4 className="text-xl font-bold mb-4 text-center mt-5">Síguenos</h4>
                    <div className="flex justify-center space-x-10">
                        <a href="#" className="hover:text-blue-500 text-2xl">
                            <FaFacebook />
                        </a>
                        <a href="#" className="hover:text-blue-400 text-2xl">
                            <FaTwitter />
                        </a>
                        <a href="#" className="hover:text-pink-500 text-2xl">
                            <FaInstagram />
                        </a>
                        <a href="#" className="hover:text-blue-400 text-2xl">
                            < FaEnvelope />
                        </a>

                    </div>
                </div>
            </div>
            <div className="mt-6 border-t border-gray-500 pt-4 text-center">
                <p className="text-sm text-gray-400">© 2024 Happy Work. Todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
