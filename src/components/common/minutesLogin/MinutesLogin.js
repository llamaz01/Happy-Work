import React, { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import styles from "./styles/minuteslogin.module.css"

const MinutesLogin = () => {
  const { isAuthenticated } = useAuth();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      const timer = setTimeout(() => setShowModal(true), 60000); // Mostrar modal después de 1 minuto
      return () => clearTimeout(timer); // Limpiar el temporizador si el componente se desmonta
    }
  }, [isAuthenticated]);

  if (!showModal) return null;

  const redirectToLogin = () => {
    window.location.href = "/auth/login"; 
  };

  return (
    <div className={styles.modal_overlay}>
      <div className={styles.modal_content}>
        <h2>¡Regístrate o inicia sesión!</h2>
        <p>Para continuar disfrutando del contenido, por favor inicia sesión o regístrate.</p>
        <div className={styles.modal_buttons}>
          <button className="btn_login" onClick={redirectToLogin}>
            Ir a iniciar sesión
          </button>
        </div>
      </div>
    </div>
  );
};

export default MinutesLogin;
