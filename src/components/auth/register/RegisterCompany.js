import React, { useState, useEffect } from "react";
import Typewriter from "typewriter-effect";
import styles from "./styles/register.module.css";
import useAuth from "../../../hooks/useAuth";
import { useUser } from "../../../contexts/userProvider";
import Loader from "../../common/loader/loader";
import { useNavigate } from "react-router-dom";
import Loading from "../../common/loader/loading";
import ImageWithAnimation from "./ImageWithAnimation";
import InputField from "./InputField";

const defaultValues = {
  email: "",
  password: "",
};

const RegisterCompany = () => {
  const navigate = useNavigate();
  const { postLogin, error, errorResponse, isLoading, data } = useAuth();
  const { login: saveUser } = useUser();
  const [formData, setFormData] = useState(defaultValues);

  useEffect(() => {
    if (data && !error) {
      saveUser(data.token, data.user);
    }
  }, [data, error, saveUser]);

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
    <div
      className={`relative w-screen h-screen flex justify-center items-center text-white pt-16 z-0 ${styles.content_register_top}`}
    >
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
              Registrar
            </h3>
            <h3 className="text-sm mt-3 text-blue-950">Cuenta Empresarial</h3>
            <hr className="my-4 border-t-2 border-gray-100" />

            {/* Usando el subcomponente InputField para los campos */}
            <InputField label="Nombre" type="text" name="name" placeholder="" />
            <InputField
              label="Rubro"
              type="text"
              name="industry"              
            />
            <InputField
              label="Direccion"
              type="text"
              name="address"
            />
            <InputField
              label="Cantidad de Empleados"
              type="text"
              name="countEmployee"
            />
            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
            />

            <InputField
              label="Contraseña"
              type="password"
              name="password"
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

export default RegisterCompany;
