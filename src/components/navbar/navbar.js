import React from "react";

const Navbar = () => {
  return (
    <>
      <div className="bg-white">
        <nav className="container mx-auto flex justify-between">
          <h1 className="text-2xl font-bold text-white">Mi Landing Page</h1>
          <ul className="flex space-x-4">
            <li>
              <a href="#features" className="text-lg hover:text-blue-500 text-blue-950">
                Home
              </a>
            </li>
            <li>
              <a href="#testimonials" className="hover:text-gray-300 text-white">
                Testimonios
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-gray-300 text-white">
                Contacto
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
