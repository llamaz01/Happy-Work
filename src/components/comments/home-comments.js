import React, { useEffect, useState } from "react";
import styles from "./styles/comments.module.css";
import "@fontsource/inter";
import { useNavigate } from "react-router-dom";
import CommentModal from "./commentModal";
import { FaSearch } from "react-icons/fa";
import RenderStars from "../common/stars/renderStars";
import Loader from "../common/loader/loader";
const API_URL = process.env.REACT_APP_API_URL;

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
        const response = await fetch(`${API_URL}/api/comments/companies/data`);
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
      const response = await fetch(`${API_URL}/api/comments`, {
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

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

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
      <div className={`flex justify-evenly flex-wrap mt-4 lg:mt-0 shadow-lg p-2 ${styles.contentTxtRanking}`}>
        <div className="max-w-2xl">
          <h1 className={`font-bold text-4xl rounded-md ${styles.txtPrincipalColor}`}>Comentarios</h1>
          <div className={`mt-5 text-sm ${styles.txtSecundaryColor}`}>
            <p>Te mostramos las opiniones de los diferentes usuarios acerca de una empresa en cuestión, si tienes algo que comentarnos, hazlo!</p>
          </div>
        </div>
        <div>
          <img src="/image/comentarios.png" alt="comentarios" width={200} className={styles.imgComentarios} />
        </div>
      </div>

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
