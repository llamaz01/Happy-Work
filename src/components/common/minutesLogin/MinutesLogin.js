import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MinutesLogin = () => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => setShowModal(true), 100000);
      return () => clearTimeout(timer);
    }
  }, [isAuthenticated]);

  if (!showModal) return null;

  const redirectToLogin = () => {
    window.location.href = "/auth/login";
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
          ¡Regístrate o inicia sesión!
        </h2>
        <p className="text-gray-600 mb-8">
          Para continuar disfrutando del contenido, por favor inicia sesión o regístrate.
        </p>
        <img src="/image/iniciarsesionmodal.jpg" alt="imagen" />
        <div className="flex justify-center">
          <button
            className="bg-white hover:bg-purple-800 text-gray-900 hover:text-white border border-gray-900 hover:border-purple-800 font-semibold py-2 px-4 rounded shadow focus:outline-none focus:ring-2 focus:ring-purple-400 w-full"
            onClick={redirectToLogin}
          >
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinutesLogin;
