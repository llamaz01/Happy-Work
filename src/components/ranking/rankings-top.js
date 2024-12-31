import React from "react";
import RenderStars from "../common/stars/renderStars";
import styles from "./styles/ranking-top.module.css";
import { useNavigate } from "react-router-dom";

const RankingTop = ({ data, index }) => {
    const navigate = useNavigate();
    const handleClick = (id) => {
        navigate(`/commets/detailscompany/${id}`);
    };

    return (
        <div
        onClick={() => handleClick(data.id)}
        className={`text-white p-4 mt-4  ${styles.bgRankingTop} cursor-pointer hover:bg-gray-100 transition duration-300`}
    >
        <div className="flex flex-col sm:flex-row justify-between items-start space-y-4 sm:space-y-0 sm:space-x-8 mb-6">
            {/* Información principal */}
            <div className="w-full sm:w-1/2">
                <div>
                    <h1
                        className={`text-xl font-bold mb-1 break-words ${styles.txtPrincipalColor}`}
                    >
                        {`${index + 1}. ${data.name || "Cargando empresa..."}`}
                    </h1>
                </div>
                <div className="flex flex-wrap items-center">
                    <div>
                        <p
                            className={`text-base break-words mr-1 ${styles.txtSecundaryColor}`}
                        >
                            Categoria:
                        </p>
                    </div>
                    <div>
                        <p
                            className={`text-sm break-words ${styles.txtSecundaryColor}`}
                        >
                            {data.industry}
                        </p>
                    </div>
                </div>
            </div>
    
            {/* Información secundaria */}
            <div className="w-full sm:w-1/2">
                <div className="flex items-center sm:justify-end justify-start space-x-4">
                    <div>
                        <span
                            className={`text-base mb-1 break-words ${styles.txtSecundaryColor}`}
                        >
                            <strong>{data.averageRating || "0.0"}</strong>
                        </span>
                    </div>
                    <div>
                        <RenderStars rating={data.averageRating || 0} />
                    </div>
                </div>
                <div className="mt-2">
                    <h4
                        className={`text-sm break-words ${styles.txtSecundaryColor}`}
                    >
                        {data.description || "Sin descripción disponible."}
                    </h4>
                </div>
            </div>
        </div>
    </div>
    
    );
};

export default RankingTop;
