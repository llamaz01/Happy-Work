import React from "react";
import styles from "./styles/comments.module.css";
import "@fontsource/inter";

const Comments = () => {
  const empresas = [
    {
      nombre: "Empresa 1",
      descripcion: "Descripción breve de la empresa",
      calificacion: 4.2,
      comentarios: 20,
    },
    {
      nombre: "Empresa 2",
      descripcion: "Descripción breve de la empresa",
      calificacion: 4.2,
      comentarios: 20,
    },
  ];

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
        {empresas.map((empresa, index) => (
          <div key={index} className={styles.empresaCard}>
            <div className={styles.empresaInfo}>
              <h2>{empresa.nombre}</h2>
              <p>{empresa.descripcion}</p>
            </div>
            <div className={styles.empresaActions}>
              <p>
                <strong>Calificación:</strong>{" "}
                <span className={styles.ratingStars}>⭐</span> {empresa.calificacion.toFixed(1)}
              </p>
              <button className={styles.commentsButton}>
                Ver los {empresa.comentarios} comentarios
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
