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
      <div>
        Opss.. Al parecer no existe la página
      </div>
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: "#fff",
          backgroundColor: "#007bff",
          padding: "10px 20px",
          borderRadius: "5px",
          fontSize: "20px",
          marginTop: "20px",
          display: "inline-block",
        }}
      >
        Volver al inicio
      </Link>
    </div>
  );
};

export default PageNotFound;
