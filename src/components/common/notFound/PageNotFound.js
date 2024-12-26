import React from "react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-screen" style={{ textAlign: "center" }}>
      {/* Imagen de error */}
      <div className="flex justify-center">
        <img
          src="/image/pagenotfound.png"
          alt="404 Not Found"
          width={500}
        />
      </div>
      <div className="text-purple-600 font-bold">
        Opss.. Al parecer no existe la página
      </div>
      <Link
        to="/"
        className="border-purple-600 text-purple-700 hover:text-white hover:bg-purple-700 transition duration-300 ease-in-out"
        style={{
          textDecoration: "none",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "20px",
          marginTop: "20px",
          display: "inline-block",
          border: "1px solid"
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PageNotFound;
