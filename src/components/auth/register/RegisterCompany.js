import React, { useState, useEffect } from "react";
import styles from "./styles/register.module.css";
import useAuth from "../../../hooks/useAuth";
import { useUser } from "../../../contexts/userProvider";
import Loading from "../../common/loader/loading";
import ImageWithAnimation from "./ImageWithAnimation";
import InputField from "./InputField";

const defaultValues = {
  name: "",
  industry: "",
  address: "",
  countEmployee: 0,
  email: "",
  password: "",
};

const RegisterCompany = () => {
  const { postRegisterCompany, data, error, errorResponse, isLoading } =
    useAuth();
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
    if (
      !formData.name ||
      !formData.address ||
      !formData.industry ||
      formData.countEmployee == 0 ||
      !formData.email ||
      !formData.password
    ) {
      return "Todos los campos son obligatorios.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return "Correo electrónico no válido.";
    }
    if (formData.password.length < 6) {
      return "La contraseña debe tener al menos 6 caracteres.";
    }

    if (formData.countEmployee <= 0) {
      return "La empresa no puede tener cero o menos empleados.";
    }
    return null;
  };

  const onSubmit = async () => {
    const error = validateForm();
    if (error) {
      console.log(error);
      setValidationError(error);
      return;
    }
    setValidationError("");
    await postRegisterCompany(formData);
  };

  return (
    <div
      className={`h-[100%] mb-10 relative w-screen flex justify-center items-center text-white pt-16 z-0`}
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

            <div className="text-red-500 text-sm mt-2">
              {validationError && <p>{validationError}</p>}
              {errorResponse?.message && <p>{errorResponse.message}</p>}
            </div>

            {/* Usando el subcomponente InputField para los campos */}
            <InputField
              label="Nombre de la Empresa"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <InputField
              label="Rubro"
              type="text"
              name="industry"
              value={formData.industry}
              onChange={handleChange}
            />
            <InputField
              label="Dirección"
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
            <InputField
              label="Cantidad de Empleados"
              type="number"
              name="countEmployee"
              value={formData.countEmployee}
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
              className="w-full p-2 rounded-xl bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-8 border border-blue-500 hover:border-transparent"
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
