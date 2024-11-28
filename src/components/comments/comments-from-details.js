import React from "react";
import RenderStars from "../common/stars/renderStars";

const CommentsFromDetails = ({ data }) => {
  const {
    user: {
      email,
      id,
      name,
    },
    date,
    comment,
    rating: {
      workLifeBalance,
      salary,
      growthOpportunities,
      workEnvironment,
      professionalDevelopment,
    },
  } = data;


  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl mx-auto mb-4">
      <div className="flex items-center space-x-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
          <img src="/image/lupaLogo.png" width={35} alt="Logo" />
        </div>
        <div>
          <h1 className="text-lg font-semibold text-gray-900 break-words">
            {data.isAnonymous ? "Anónimo" : name}
          </h1>
          <p className="text-sm text-gray-500">
            {new Date(date).toLocaleDateString()}
          </p>
        </div>
      </div>

      <h3 className="text-gray-900 font-medium text-base mb-2">Comentario:</h3>
      <p className="text-gray-700 text-sm mb-6 break-words">{comment}</p>

      <div className="space-y-3">
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm text-gray-600">Balance Vida-Trabajo</h3>
          <RenderStars rating={workLifeBalance} />
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm text-gray-600">Salario y Beneficios</h3>
          <RenderStars rating={salary} />
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm text-gray-600">Oportunidades de Crecimiento</h3>
          <RenderStars rating={growthOpportunities} />
        </div>
        <div className="flex items-center justify-between border-b pb-2">
          <h3 className="text-sm text-gray-600">Clima Laboral</h3>
          <RenderStars rating={workEnvironment} />

        </div>
        <div className="flex items-center justify-between">
          <h3 className="text-sm text-gray-600">Desarrollo Profesional</h3>
          <RenderStars rating={professionalDevelopment} />
        </div>
      </div>
    </div>
  );
};

export default CommentsFromDetails;

