import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import styles from "./styles/login.module.css";
import useAuth from "../../../hooks/useAuth";
import { useUser } from "../../../contexts/userProvider";
import Loader from "../../common/loader/loader";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/loader/loading";

const defaultValues = {
  email: "",
  password: "",
};

const Login = () => {
  const navigate = useNavigate();
  const { postLogin, error, errorResponse, isLoading, data } = useAuth();
  const { login: saveUser } = useUser();
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (data && !error) {
      console.log(data.token);
      saveUser(data.token, {
        _id: data._id,
        name: data.name,
        email: data.email,
      });
    }
  }, [data, error]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    await postLogin(formData);
  };

  return (
    <div className="relative w-screen h-screen flex justify-center items-center text-white pt-16 z-0 ">
      <div className="grid grid-cols-1 md:grid-cols-2">
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

        {/* Contenedor de login */}
        <div
          className={`bg-white p-4 text-black flex justify-center items-center top-10 ${styles.content_login}`}
        >
          <div className="w-full max-w-md border-2 border-gray-100 rounded-lg p-4">
            <img src="/image/logo.png" alt="logo" />
            <hr className="my-4 border-t-2 border-gray-100" />

            <div className="text-center">
              {errorResponse?.message && (
                <div className="text-red-500 text-sm mt-2">
                  {errorResponse.message}
                </div>
              )}
            </div>

            <label htmlFor="email" className="text-gray-500 text-xs">
              Correo Electrónico
            </label>
            <input
              type="text"
              name="email"
              placeholder="correo electronico"
              value={formData.email}
              onChange={handleChange}
              required={true}
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:border-gray-300 focus:outline-none"
            />
            <label htmlFor="password" className="text-gray-500 text-xs">
              Contraseña
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="contraseña"
              required={true}
              className="w-full p-2 mb-4 border border-gray-200 rounded focus:border-gray-300 focus:outline-none"
            />

            <button
              className="w-full h-9 p-2 rounded-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-8 border border-blue-500 hover:border-transparent"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Entrar"}
            </button>
            <hr className="my-4 border-t-2 border-gray-100" />

            <div className="text-center">
              <label>
                <a
                  href="#olvidastelacontraseña"
                  className="underline text-blue-950 font-semibold text-sm"
                >
                  Olvidaste tu contraseña?
                </a>
              </label>
              <label className="flex items-center justify-center text-gray-600 mt-2">
                <h3 className="text-sm">Aún no tengo una cuenta, </h3>
                <span className="inline">
                  <a
                    href="/auth/register"
                    className="underline text-blue-950 font-semibold"
                  >
                    {" "}
                    Registrarme!
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

export default Login;