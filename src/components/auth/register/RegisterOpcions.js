import React from "react";
import styles from "./styles/register.module.css";
import ImageWithAnimation from "./ImageWithAnimation";
import { useNavigate } from "react-router-dom";

const RegisterOpcion = () => {
  const navigate = useNavigate();

  const handleMenuClick = (route) => {
    navigate(route);
  };

  return (
    <div className={`relative w-screen h-screen flex justify-center items-center text-white pt-16 z-0`}>
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Imagen contenedor con animación */}
        <ImageWithAnimation
          imageUrl="/image/empoderatuvoz.gif"
          text="Empodera tu voz,<br/> <strong>mejora tu trabajo</strong>"
        />

        {/* Contenedor de Register */}
        <div
          className={`bg-white p-4 text-black flex justify-center items-center top-10 ${styles.content_login}`}
        >
          <div className="w-full max-w-md border-2 border-gray-100 rounded-lg p-4">
            <img src="/image/logo.png" alt="logo" />
            <h3 className="text-lg font-semibold mt-4 text-blue-950">
              Registrarme
            </h3>
            <hr className="my-4 border-t-2 border-gray-100" />

            {/* Usando el subcomponente InputField para los campos */}
            <div className="mt-10 mb-5">
            <button
              className="w-full p-2 rounded-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-8 border border-blue-500 hover:border-transparent"
              onClick={() => handleMenuClick("/auth/register/user")}
            >
              Cuenta Personal
            </button>
            </div>

            <div className="mt-10 mb-10">
            <button
              className="w-full p-2 rounded-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-8 border border-blue-500 hover:border-transparent"
              onClick={() => handleMenuClick("/auth/register/company")}
            >
              Cuenta Empresarial
            </button>
            </div>

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

export default RegisterOpcion;
