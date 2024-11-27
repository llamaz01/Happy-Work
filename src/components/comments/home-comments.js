import React, { useEffect, useState } from "react";
import styles from "./styles/comments.module.css";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";
import CommentModal from "./commentModal";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";

const Comments = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]); // Lista completa de empresas
  const [filteredEmpresas, setFilteredEmpresas] = useState([]); // Empresas filtradas
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Término de búsqueda

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/comments/companies/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmpresas(data);
        setFilteredEmpresas(data); // Inicialmente, mostrar todas las empresas
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
      console.log("Éxito");
    } catch (error) {
      console.error(error);
    }
  };

  // Manejar el cambio en el campo de búsqueda
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  // Buscar empresas al hacer clic en el botón
  const handleSearchSubmit = () => {
    const filtered = empresas.filter((empresa) =>
      empresa.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmpresas(filtered); // Actualizar la lista de empresas filtradas
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
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaSearch className="text-blue-950 mr-2" />
            <input
              type="text"
              placeholder="Buscar Empresa"
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <button
            onClick={handleSearchSubmit} 
            className="ml-2 p-2 bg-white text-blue-700 border-2 border-blue-800 rounded-md hover:border-blue-950 hover:bg-blue-950 hover:text-white transition-colors duration-300"
          >
            Buscar
          </button>
          <button
            className={styles.addCommentButton}
            onClick={() => setShowModal(true)}
          >
            Agregar comentario
          </button>
        </div>
      </header>

      <div className={styles.empresasList}>
        {filteredEmpresas.length > 0 ? (
          filteredEmpresas.map((empresa) => (
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
          ))
        ) : (
          <p className={styles.noResults}>No se encontraron empresas</p>
        )}
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
