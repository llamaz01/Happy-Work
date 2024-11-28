import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "react-select";
import { useUser } from "../../contexts/userProvider";
import Rating from "@mui/material/Rating";
import styles from "./styles/modal.module.css";
import { toast } from "react-toastify";

const CommentModal = ({ empresas, onClose, onSubmit }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const API_URL = process.env.REACT_APP_API_URL;
  const [selectedEmpresa, setSelectedEmpresa] = useState(null);
  const ratingLabels = {
    workLifeBalance: "Equilibrio vida-trabajo",
    salary: "Salario",
    growthOpportunities: "Oportunidades de crecimiento",
    workEnvironment: "Ambiente laboral",
    professionalDevelopment: "Desarrollo profesional",
  };

  const [commentData, setCommentData] = useState({
    user: user ? user._id : "",
    name: user ? user.name : "",
    isAnonymous: false,
    comment: "",
    ratings: {
      workLifeBalance: 0,
      salary: 0,
      growthOpportunities: 0,
      workEnvironment: 0,
      professionalDevelopment: 0,
    },
  });

  if (!user) {
    if (user !== null) {
      return null;
    }
    toast.info("Primero debes iniciar sesión para agregar un comentario");
    return <Navigate to="/auth/login" replace />;
  }


  const handleInputChange = (field, value) => {
    setCommentData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleRatingChange = (field, value) => {
    setCommentData((prev) => ({
      ...prev,
      ratings: { ...prev.ratings, [field]: value },
    }));
  };

  const postComment = async () => {
    if (!selectedEmpresa || !commentData.comment) {
      toast.error("Por favor completa todos los campos requeridos.", {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const response = await fetch(`${API_URL}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          user: commentData.user,
          name: commentData.name,
          isAnonymous: commentData.isAnonymous,
          company: selectedEmpresa.value,
          comment: commentData.comment,
          ratings: commentData.ratings,
        }),
      });

      const responseData = await response.json();
      if (!response.ok) throw new Error(responseData.message);

      toast.success("¡Tu comentario se envió con éxito!", {
        position: "top-center",
        autoClose: 3000,
      });
      onSubmit(commentData);
      onClose();
    } catch (error) {
      console.error("Error al enviar el comentario:", error);
      toast.error("Hubo un error al enviar tu comentario. Intenta de nuevo más tarde.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const handleSubmit = () => {
    postComment();
  };


  const empresaOptions = empresas.map((empresa) => ({
    value: empresa.id,
    label: empresa.name,
  }));

  return (
    <div className={styles["modal-overlay"]}>
      <div className={styles["modal-content"]}>
        <div className={styles["modal-content-prin"]}>
          <h2>Agregar Comentario</h2>
        </div>
        <hr className={styles.hr_comment}/>
        <label>
          <span>Seleccionar Empresa:</span>
          <Select
            options={empresaOptions}
            value={selectedEmpresa}
            onChange={setSelectedEmpresa}
            placeholder="Escribe para buscar..."
          />
        </label>
        {/* Comentario */}
        <label>
          <span>Comentario:</span>
          <textarea
            value={commentData.comment}
            onChange={(e) => handleInputChange("comment", e.target.value)}
            placeholder="Escribe tu comentario..."
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </label>
        {/* Valoraciones */}
        <div className={styles.ratings}>
          {Object.keys(commentData.ratings).map((key) => (
            <div key={key} className={styles["rating-item"]}>

              <span>{ratingLabels[key]}</span>
              <Rating
                name={key}
                value={commentData.ratings[key]}
                onChange={(event, newValue) => handleRatingChange(key, newValue)}
                precision={1}
                sx={{
                  "& .MuiRating-iconFilled": {
                    color: "gold",
                  },
                  "& .MuiRating-iconHover": {
                    color: "gold",
                  },
                  "& .MuiRating-iconEmpty": {
                    color: "gray",
                  },
                }}
              />

            </div>

          ))}
        </div>
        <hr className={styles.hr_comment}/>
        {/* Comentario anonimo */}
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            checked={commentData.isAnonymous}
            onChange={(e) => handleInputChange("isAnonymous", e.target.checked)}
            className="hidden peer"
          />
          <div className="w-6 h-6 border-2 border-gray-300 rounded-md flex items-center justify-center bg-white peer-checked:bg-blue-500">
          </div>
          <span>Enviar comentario de forma anónima</span>
        </label>
        
        {/* Botones */}
        <div className={styles.actions}>
          <button onClick={onClose} className={styles["cancel-button"]}>
            Cancelar
          </button>
          <button onClick={handleSubmit} className={styles["submit-button"]}>
            Comentar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
