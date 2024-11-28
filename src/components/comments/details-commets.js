import React, { useEffect, useState } from "react";
import styles from "./styles/details.module.css";
import CommentsFromDetails from "./comments-from-details";
import useDetailsComments from "../../hooks/useDetailsComments";
import { useParams } from "react-router-dom";
import RenderStars from "../common/stars/renderStars";
import Loader from "../common/loader/loader";

const DetailsComments = () => {
  const { id } = useParams();
  const [comments, setComments] = useState({
    company: {
      name: "",
      description: "",
      overallAverage: 0,
    },
    comments: [],
  });

  const { fetchCommentsCompany, error, errorResponse, isLoading, data } = useDetailsComments();


  const fetchComment = async () => {
    try {
      const response = await fetchCommentsCompany(id);
      setComments(response);
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  useEffect(() => {
    if (id) {
      fetchComment();
    } else {
      console.error("Company ID is undefined");
    }
  }, [id]);


  return (
    <div className="pt-6">
      <div className={`text-white p-4 rounded-md max-w-4xl mx-auto ${styles.bgDetailsComments}`}>
        <div className="flex justify-between items-start space-x-8">
          <div>
            <h1 className="text-2xl font-bold">{comments.company?.name || "Cargando empresa..."}</h1>
            <h4 className="text-gray-400">{comments.company?.description || "Sin descripción disponible."}</h4>
          </div>
          <div className="flex items-center space-x-4">
            <RenderStars rating={comments.company?.overallAverage || 0} />
            <span className="text-gray-400"><strong>{comments.company?.overallAverage || "0.0"}</strong></span>

          </div>
        </div>
      </div>

      <div className="text-black max-w-4xl mx-auto bg-gray-100 rounded-md">
        <div className="p-4">
          {error && (
            <p className="text-center text-red-500">Error al cargar los comentarios: {errorResponse}</p>
          )}
          {isLoading ? (
            <Loader />
          ) : comments?.comments?.length > 0 ? (
            comments.comments.map((comment) => (
              <CommentsFromDetails key={comment.id} data={comment} />
            ))
          ) : (
            <p className="text-center text-gray-500">No hay comentarios disponibles.</p>
          )}


        </div>
      </div>
    </div>
  );
};

export default DetailsComments;
