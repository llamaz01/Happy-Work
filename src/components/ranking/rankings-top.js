import React from "react";
import RenderStars from "../common/stars/renderStars";
import styles from "./styles/ranking-top.module.css";
import { useNavigate } from "react-router-dom";

const RankingTop = ({ data }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/commets/detailscompany/${id}`);
    };

    return (
        <div
            onClick={() => handleClick(data.id)}
            className={`text-white p-4 mt-4 shadow-lg ${styles.bgRankingTop} transition-transform transform  hover:bg-gray-800 cursor-pointer`}
        >
            <div className="flex justify-between items-start space-x-8">
                <div>
                    <h1 className="text-gray-200 text-2xl font-bold mb-6 break-words">{data.name || "Cargando empresa..."}</h1>
                    <h4 className="text-gray-300 mb-2 break-words">{data.description || "Sin descripción disponible."}</h4>
                </div>
                <div className="flex items-center space-x-4">
                    <RenderStars rating={data.averageRating || 0} />
                    <span className="text-gray-400"><strong>{data.averageRating || "0.0"}</strong></span>
                </div>
            </div>
        </div>
    );
};

export default RankingTop;
