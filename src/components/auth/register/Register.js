import React, { useState, useEffect } from "react";
import styles from "./styles/register.module.css";
import InputField from "./InputField";
import ImageWithAnimation from "./ImageWithAnimation";
import useAuth from "../../../hooks/useAuth";
import Loading from "../../common/loader/loading";
import { useUser } from "../../../contexts/userProvider";

const defaultValues = {
  name: "",
  email: "",
  password: "",
};

const Register = () => {
  const { postRegisterUser, data, error, errorResponse, isLoading } = useAuth();
  const [formData, setFormData] = useState(defaultValues);
  const [validationError, setValidationError] = useState("");
  const { login: saveUser } = useUser();

  useEffect(() => {
    if (!data || error) return;
    saveUser(data.token, {
      name: data.name,
      email: data.email,
      _id: data._id,
    });
  }, [data, error]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password) {
      return "Todos los campos son obligatorios.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Correo electrónico no válido.";
    }
    if (formData.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }
    return null;
  };

  const onSubmit = async () => {
    const error = validateForm();
    if (error) {
      setValidationError(error);
      return;
    }
    setValidationError("");
    await postRegisterUser(formData);
  };

  return (
    <div
      className={`h-[100%] relative w-screen flex justify-center items-center text-white pt-16 z-0 mb-10`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2">
        {/* Imagen contenedor con animación */}
        <ImageWithAnimation
          imageUrl="/image/empoderatuvoz.png"
          text="Empodera tu voz,<br/> <strong>mejora tu trabajo</strong>"
        />

        {/* Contenedor de Register */}
        <div
          className={`bg-white p-4 text-black flex justify-center items-center top-10 ${styles.content_login}`}
        >
          <div className="w-full max-w-md border-2 border-gray-100 rounded-lg p-4">
            <img src="/image/logo.png" alt="logo" />
            <h3 className="text-lg font-semibold mt-4 text-purple-950">
              Registrar
            </h3>
            <h3 className="text-sm mt-3 text-purple-950">Cuenta Personal</h3>
            <hr className="my-4 border-t-2 border-gray-100" />

            <div className="text-red-500 text-sm mt-2">
              {validationError && <p>{validationError}</p>}
              {errorResponse?.message && <p>{errorResponse.message}</p>}
            </div>
            {/* Usando el subcomponente InputField para los campos */}
            <InputField
              label="Nombre"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Correo Electrónico"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <InputField
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <button
              className="w-full p-2 rounded-xl bg-transparent hover:bg-purple-600 text-purple-600 font-semibold hover:text-white py-1 px-8 border border-purple-600 hover:border-transparent"
              onClick={onSubmit}
              disabled={isLoading}
            >
              {isLoading ? <Loading /> : "Registrar"}
            </button>
            <hr className="my-4 border-t-2 border-gray-100" />

            <div className="text-center">
              <label className="flex items-center justify-center text-gray-600 mt-2">
                <h3 className="text-sm">Ya tengo una cuenta, </h3>
                <span className="inline">
                  <a
                    href="/auth/login"
                    className="underline text-purple-950 font-semibold"
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
