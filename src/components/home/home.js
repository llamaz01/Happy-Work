import React from "react";
import styles from "./styles/home.module.css";
import { useNavigate,Link } from "react-router-dom"; 
import '@fontsource/inter'; 


const Home = () => {
  const navigate = useNavigate(); 

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <img
          src="/image/oficina.jpg"
          alt="Cabecera"
          className={styles.headerImage}
        />
        <div className={styles.headerText}>
          <div className={styles.titleWrapper}>
            <h1>Happy Work :)</h1>
          </div>
          <h2>Empodera tu voz <br /> Mejora tu trabajo</h2>
        </div>
      </header>
      
      <div className={styles.cardsContainer}>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/ranking")}
        >
          <img src="/image/ranking.jpeg" alt="Ranking" />
          <p>Ranking</p>
          <p>Un top de las empresas
          mas mencionadas por nuestros seguidores</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/comentarios")}
        >
          <img src="/image/comentarios.jpeg" alt="Comentarios" />
          <p>Comentarios</p>
          <Link
                to="/comments" />
          <p>Un top de las empresas más mencionadas por nuestros seguidores</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/empresa")}
        >
          <img src="/image/empresas.jpeg" alt="Empresa" />
          <p>Empresas</p>
          <p>Busca la empresa de tu agrado y descubre todos los comentarios
             que se han dicho de esa empresa</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
