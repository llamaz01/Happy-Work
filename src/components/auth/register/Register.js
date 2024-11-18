import React from "react";
import Typewriter from "typewriter-effect";
import styles from "./styles/register.module.css";

const Register = () => {
  return (
    <div className="relative w-screen h-screen flex justify-center items-center text-white pt-16 z-0">
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        {/* Imagen contenedor */}
        <div
          className={`relative bg-blue-500 p-4 text-white ${styles.content_image_login}`}
          style={{
            backgroundImage: "url('/image/empoderatuvoz.gif')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            objectFit: "contain",
            height: "80vh",
          }}
        >
          {/* Animación de escritura */}
          <div className="absolute inset-0 flex justify-center items-center">
            <h1 className="text-3xl md:text-3xl text-white ">
              <Typewriter
                options={{
                  strings: [
                    "Empodera tu voz,<br/> <strong>mejora tu trabajo</strong>",
                  ],
                  autoStart: true,
                  loop: true,
                  delay: 75,
                  deleteSpeed: 50,
                  pauseFor: 7000,
                }}
              />
            </h1>
          </div>
        </div>

        {/* Contenedor de Register */}
        <div
          className={`bg-white p-4 text-black flex justify-center items-center top-10 ${styles.content_login}`}
        >
          <div className="w-full max-w-md border-2 border-gray-100 rounded-lg p-4 ">
            <h3 className="text-3xl font-bold mb-8 mt-4 text-blue-950 text-center">
              Happy Work
            </h3>

            <h3 className="text-lg font-semibold mt-4 text-blue-950">
              Registrarme
            </h3>
            <hr className="my-4 border-t-2 border-gray-100" />
            <label htmlFor="email" className="text-gray-500 text-xs">
              Nombre
            </label>
            <input
              type="text"
              placeholder=" "
              className="w-full p-2 mb-4  border border-gray-200 rounded focus:border-gray-300 focus:outline-none"
            />
            <label htmlFor="email" className="text-gray-500 text-xs">
              Correo Electrónico
            </label>
            <input
              type="text"
              placeholder=" "
              className="w-full p-2 mb-4  border border-gray-200 rounded focus:border-gray-300 focus:outline-none"
            />
            <label htmlFor="password" className="text-gray-500 text-xs">
              Contraseña
            </label>
            <input
              type="password"
              placeholder=" "
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:border-gray-300 focus:outline-none"
            />

            <button className="w-full p-2 rounded-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-8 border border-blue-500 hover:border-transparent">
              Registrar
            </button>
            <hr className="my-4 border-t-2 border-gray-100" />

            <div className="text-center">
              <label className="flex items-center justify-center text-gray-600 mt-2">
                <h3 className="text-sm">Ya tengo una cuenta, </h3>
                <span className="inline">
                  <a
                    href="/auth/login"
                    className="underline text-blue-950 font-semibold"
                  >
                    {" "}
                    Iniciar Sesión!
                  </a>
                </span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
