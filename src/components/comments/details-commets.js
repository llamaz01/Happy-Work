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

      console.log(response);

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
      <div className={`text-white p-4 max-w-4xl mx-auto ${styles.bgDetailsComments}`}>
        <div className="flex justify-between items-start space-x-8">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold break-words">{comments.company?.name || "Cargando empresa..."}</h1>
            <h1 className="text-gray-800 mt-4">Descripción General:</h1>
            <h4 className="text-gray-400 break-words">{comments.company?.description || "Sin descripción disponible."}</h4>
            <h1 className="text-gray-800 mt-4">Puntuación General:</h1>
            <div className="flex items-baseline space-x-4">
              <span className="text-purple-800 text-4xl font-bold">{comments.company?.overallAverage || "0.0"}</span>
              <RenderStars rating={comments.company?.overallAverage || 0} />
            </div>
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
            <p className="text-center text-gray-500">Ups... No hay comentarios disponibles.</p>
          )}


        </div>
      </div>
    </div>
  );
};

export default DetailsComments;
