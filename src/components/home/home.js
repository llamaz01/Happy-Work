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
    <div className={`h-[100%] mb-10 ${styles.container}`}>
      <header className={`flex items-center justify-center ${styles.header}`}>

        <div className={`${styles.headerText}`}>
          <div className={styles.titleWrapper}>
            <h1>Happy Work</h1>
          </div>
          <h2>Empodera tu voz, <br /> <strong className={styles.txt_mejora}> mejora tu trabajo</strong></h2>
          <h3>Te ofrecemos las herramientas esenciales para comenzar tu vida laboral con éxito</h3>
        </div>

        <div>
          <img src="/image/developer.png" alt="imagen_inicio" width={500} />
        </div>
      </header>

      <div>
        <div className={`w-screen p-6 pb-16 ${styles.ranking_home_container}`}>
          <p className="text-white text-center text-xl font-bold ">Top de empresas mejores valoradas</p>
          <p className="text-gray-100 text-center mt-3 "> Te mostramos algunas de las empresas mejor evaluadas por nuestros usuarios </p>
        </div>

        <div className={`bg-white mt-[-50px] max-w-6xl mx-auto rounded-lg shadow-2xl p-6 ${styles.ranking_home_opcion_container}`}>
          asdasadas
        </div>

      </div>


      <div className="w-screen text-center border-t-2 mt-10">
        <h1 className={`text-2xl font-bold mt-5 ${styles.txtPrincipalColor}`}>
          Navega por nuestras opciones
        </h1>
        <p className={`text-sm mt-1 mb-5 ${styles.txtSecundaryColor}`}>
          Te presentamos nuestras opciones para que tengas las herramientas necesarias para impulsar tu vida profesional
        </p>
      </div>
      <div className={styles.cardsContainer}>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/ranking")}
        >
          <img src="/image/ranking.png" alt="Ranking" />
          <p className={styles.txtPrincipalColor}>Ranking</p>
          <p className={styles.txtSecundaryColor}>El top de las empresas más mencionadas por nuestros seguidores</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/comments")}
        >
          <img src="/image/comentarios.jpeg" alt="Comentarios" />
          <p className={styles.txtPrincipalColor}>Comentarios</p>
          <Link
            to="/comments" />
          <p className={styles.txtSecundaryColor}>Comparte tu experiencia laboral y danos una visión de cómo se trabaja en la empresa</p>
        </div>
        <div
          className={styles.card}
          onClick={() => handleNavigate("/vacancy")}
        >
          <img src="/image/vacancia.png" alt="Vacancias" />
          <p className={styles.txtPrincipalColor}>Vacancias</p>
          <Link
            to="/vacancy" />
          <p className={styles.txtSecundaryColor}>Verifica las vacancias disponibles más recientes publicadas por las empresas</p>
        </div>
      </div>
    </div >
  );
};

export default Home;
