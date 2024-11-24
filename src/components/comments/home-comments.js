import React, { useEffect, useState } from "react";
import styles from "./styles/comments.module.css";
import "@fontsource/inter";

const Comments = () => {
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Llamada a la API para obtener los datos de las empresasw
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/comments/companies/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmpresas(data);
      } catch (error) {
        console.error("Error al obtener datos de la API:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    

    fetchEmpresas();
  }, []);

  if (loading) {
    return <p className={styles.loading}>Cargando...</p>;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Comentarios y Calificaciones</h1>
        <div className={styles.searchContainer}>
          <input
            type="text"
            placeholder="Buscar Empresa"
            className={styles.searchInput}
          />
          <button className={styles.addCommentButton}>Agregar comentario</button>
        </div>
      </header>

      <div className={styles.empresasList}>
        {empresas.map((empresa) => (
          <div key={empresa.id} className={styles.empresaCard}>
            <div className={styles.empresaInfo}>
              <h2>{empresa.name}</h2>
              <p>{empresa.description}</p>
            </div>
            <div className={styles.empresaActions}>
              <p>
                <strong>Calificación:</strong>{" "}
                <span className={styles.ratingStars}>⭐</span> {parseFloat(empresa.averageRating).toFixed(1)}
              </p>
              <button className={styles.commentsButton}>
                Ver los {empresa.totalComments} comentarios
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
