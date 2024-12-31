import React, { useEffect, useState } from "react";
import styles from "./styles/home.module.css";
import { useNavigate, Link } from "react-router-dom";
import '@fontsource/inter';
import useRanking from "../../hooks/useRanking";
import Loader from "../common/loader/loader";
import RankingTop from "../ranking/rankings-top";
import { FaChevronDown } from "react-icons/fa";
import Loading from "../common/loader/loading";
import Carousel from "../common/carousel/Carousel";

const Home = () => {
  const { fetchRanked,
    error,
    errorResponse,
    isLoading,
    data } = useRanking();
  const [showAll, setShowAll] = useState(false);

  const navigate = useNavigate();
  const [ranked, setRanked] = useState([]);
  const handleNavigate = (path) => {
    navigate(path);
  };

  const fetchRanking = async (companyName = "") => {
    try {
      const response = await fetchRanked(companyName);
      setRanked(response);
    } catch (error) {
      console.error("Error fetching ranking:", error);
    }
  };

  useEffect(() => {
    fetchRanking();
  }, []);


  return (
    <div className={`h-[100%] mb-10 ${styles.container}`}>
      <header className="" >

        {/* <div className={`${styles.headerText}`}>
          <div className={styles.titleWrapper}>
            <h1>Happy Work</h1>
          </div>
          <h2>Empodera tu voz, <br /> <strong className={styles.txt_mejora}> mejora tu trabajo</strong></h2>
          <h3>Te ofrecemos las herramientas esenciales para comenzar tu vida laboral con éxito</h3>
        </div>

        <div>
          <img src="/image/developer.png" alt="imagen_inicio" width={500} />
        </div> */}
        <Carousel/>
      </header>

      {ranked && ranked.length > 0 && (
      <div>
        <div className={`w-screen p-6 pb-16 ${styles.ranking_home_container}`}>
          <p className="text-white text-center text-xl font-bold ">Top de empresas mejores valoradas</p>
          <p className="text-gray-100 text-center mt-3 "> Te mostramos algunas de las empresas mejor evaluadas por nuestros usuarios </p>
        </div>

        <div className={`bg-white mt-[-50px] max-w-6xl mx-auto rounded-lg shadow-2xl p-6 ${styles.ranking_home_opcion_container}`}>
          {isLoading ? (
            <Loading/>
          ) : ranked?.length > 0 ? (
            ranked
              .slice(0, showAll ? ranked.length : 3) 
              .map((rank, index) => (
                <RankingTop key={rank.id} data={rank} index={index} />
              ))
          ) : (
            <p className="text-center text-gray-500">Ups.. No se ha podido encontrar la empresa.</p>
          )}

          {!showAll && ranked.length > 3 && (
            <button
            onClick={() => setShowAll(true)}
            className="group flex items-center mt-4 mx-auto px-4 py-2 text-purple-800 border border-purple-800 rounded-full hover:bg-purple-800 hover:text-white transition duration-300"
          >
            Ver más
            <FaChevronDown size={16} className="ml-2 text-purple-800 transition duration-300 group-hover:text-white" />
          </button>
          
          )}
        </div>
      </div>
      )}

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
