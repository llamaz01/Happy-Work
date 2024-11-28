import React, { useEffect, useState } from "react";
import styles from "./styles/comments.module.css";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";
import CommentModal from "./commentModal";
import { FaSearch } from "react-icons/fa";
import RenderStars from "../common/stars/renderStars";
import Loader from "../common/loader/loader";

const Comments = () => {
  const navigate = useNavigate();
  const [empresas, setEmpresas] = useState([]);
  const [filteredEmpresas, setFilteredEmpresas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/comments/companies/data");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setEmpresas(data);
        setFilteredEmpresas(data);
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
    setFilteredEmpresas(filtered);
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className={styles.error}>Error: {error}</p>;
  }

  return (
    <div className={`pt-6 max-w-5xl mx-auto`}>
      <header className={` flex justify-between items-center flex-col lg:flex-row mt-4 lg:mt-0 `}>
        <div className="text-blue-950 font-bold text-center text-4xl p-4 rounded-md">
          <h1>Comentarios y Calificaciones</h1>
        </div>
        <div className="flex">
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
            className="ml-2 p-2 bg-white text-blue-500 border-2 border-blue-500 rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
          >
            Buscar
          </button>
        </div>
      </header>
      <div className={`flex justify-end mb-5 mt-3 ${styles.content_btn_addComments}`}>
        <button
          className={`${styles.addCommentButton} w-auto max-w-xs`}
          onClick={() => setShowModal(true)}
        >
          Agregar comentario
        </button>
      </div>

      <div className={`space-y-6`}>
        {filteredEmpresas.length > 0 ? (
          filteredEmpresas.map((empresa) => (
            <div
              key={empresa.id}
              className={`bg-white shadow-md p-6 flex flex-col md:flex-row justify-between items-start md:items-center hover:shadow-lg transition-shadow duration-300  ${styles.bgDetailsComments}`}
            >
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-200 break-words">{empresa.name}</h2>
                <p className="text-gray-300 mt-2 break-words">{empresa.description}</p>
              </div>
              <div className="mt-4 md:mt-0 md:ml-6 flex flex-col items-start md:items-end">
                <p className="flex items-center space-x-4">
                  <RenderStars rating={empresa.averageRating} />
                  <span className="text-gray-400"><strong>{empresa.averageRating || "0.0"}</strong></span>

                </p>

                {empresa.totalComments > 0 ? (
                  <button
                    className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
                    onClick={() => navigate(`/commets/detailscompany/${empresa.id}`)}
                  >
                    {empresa.totalComments === 1
                      ? `Ver ${empresa.totalComments} comentario`
                      : `Ver los ${empresa.totalComments} comentarios`}
                  </button>
                ) : (
                  <p className="mt-2 text-gray-400">0 comentarios</p>
                )}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-lg">Ups.. No se han podido encontrar la empresa</p>
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
