import React, { useEffect, useState } from "react";
import styles from "./styles/comments.module.css";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";
import CommentModal from "./commentModal";
import { toast } from "react-toastify";
const Comments = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
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

  const handleAddComment = async (newComment) => {
    try {
      const response = await fetch("http://localhost:5000/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(newComment),
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);
      console.log("exito");
    } catch (error) {
      console.error(error);
    }
  };

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
          <button
            className={styles.addCommentButton}
            onClick={() => setShowModal(true)}
          >
            Agregar comentario
          </button>
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
                <span className={styles.ratingStars}>⭐</span>{" "}
                {parseFloat(empresa.averageRating).toFixed(1)}
              </p>
              <button
                className={styles.commentsButton}
                onClick={() => navigate(`/commets/detailscompany/${empresa.id}`)}
              >
                Ver los {empresa.totalComments} comentarios
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <CommentModal
          empresas={empresas}
          onClose={() => setShowModal(false)}
          onSubmit={handleAddComment}
        />
      )}
    </div>
  );
};

export default Comments;
