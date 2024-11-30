import React from "react";
import styles from "./styles/home.module.css";
import { useNavigate, Link } from "react-router-dom";
import '@fontsource/inter';

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.card_360}>
          <img src="/image/work1.png" alt="Imagen 1" />
        </div>
        <div className={styles.headerText}>
          <div className={styles.titleWrapper}>
            <h1>Happy Work</h1>
          </div>
          <h2>Empodera tu voz, <br /> <strong className={styles.txt_mejora}> mejora tu trabajo</strong></h2>
        </div>
      </header>


      <div className={styles.cardsContainer}>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/ranking")}
        >
          <img src="/image/empresas.jpeg" alt="Ranking" />
          <p>Ranking</p>
          <p>Un top de las empresas
            mas mencionadas por nuestros seguidores</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/comments")}
        >
          <img src="/image/comentarios.jpeg" alt="Comentarios" />
          <p>Comentarios</p>
          <Link
            to="/comments" />
          <p>Publica tu experiencia laboral y danos un panorama del modo en el que se trabaja en la empresa</p>
        </div>
      </div>
    </div >
  );
};

export default Home;
