import React, { useEffect, useState } from "react";
import RankingTop from "./rankings-top";
import { FaSearch } from "react-icons/fa";
import useRanking from "../../hooks/useRanking";
import Loader from "../common/loader/loader";
import styles from "./styles/ranking-top.module.css";
import { Select } from "@material-tailwind/react";
import useCompany from "../../hooks/useCompany";

const Ranking = () => {
  const { getIndustry, error: errorCompany, errorResponse: errorRCompany, isLoading: loadingCompany, data: dataCompany } = useCompany();
  const [industries, setIndustries] = useState([]);
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const { fetchCompanyFilters, error, errorResponse, isLoading, data } = useRanking();
  const [ranked, setRanked] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleIndustryChange = (event) => {
    setSelectedIndustry(event.target.value);
  };

  const fetchIndustry = async () => {
    try {
      const response = await getIndustry();
      setIndustries(response);
    } catch (error) {
      console.error("Error fetching ranking:", error);
    }
  };

  const fetchRanking = async (companyName = "", industry = "") => {
    try {
      const response = await fetchCompanyFilters(companyName, industry);
      setRanked(response);
    } catch (error) {
      console.error("Error fetching ranking:", error);
    }
  };

  const handleSearchSubmit = () => {
    fetchRanking(searchTerm, selectedIndustry);
  };

  useEffect(() => {
    fetchRanking();
    fetchIndustry();
  }, []);

  return (
    <div className={`h-[100%] pt-6 max-w-5xl mx-auto mt-5`}>
      <div className={`flex justify-evenly flex-wrap mt-4 lg:mt-0 shadow-lg p-2 ${styles.contentTxtRanking}`}>
        <div className="max-w-2xl">
          <h1 className={`font-bold text-4xl rounded-md ${styles.txtPrincipalColor}`}>Ranking</h1>
          <div className={`mt-5 text-sm ${styles.txtSecundaryColor}`}>
            <p>Te mostramos las empresas mejor valoradas por nuestra comunidad. Descubre cuáles destacan en calidad y confianza según las opiniones de los usuarios</p>
          </div>
        </div>
        <div>
          <img src="/image/ranking.png" alt="ranking" width={150} className={styles.imgRanking} />
        </div>
      </div>

      <div className="mt-10">
        <h1 className={`text-center font-semibold text-xl ${styles.txtSecundaryColor}`}>Tienes alguna empresa en mente?</h1>
      </div>

      <div className="flex justify-center flex-wrap space-x-4 mt-5 text-center">
        <div className="relative inline-block mt-2 w-64">
          <select
            className="block w-full h-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:outline-none"
            value={selectedIndustry}
            onChange={handleIndustryChange}
          >
            <option value="">Selecciona una Categoria</option>
            {Array.isArray(industries) && industries.map((industry, index) => (
              <option key={index} value={industry}>
                {industry}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-center mt-2">
          <div className="flex items-center border border-gray-300 rounded-md p-2">
            <FaSearch className="mr-2 text-gray-300" />
            <input
              type="text"
              placeholder="Buscar Empresa"
              value={searchTerm}
              onChange={handleSearch}
              className="flex-1 focus:outline-none"
            />
          </div>

          <button
            onClick={handleSearchSubmit}
            className="ml-2 p-2 border-2 border-purple-400 text-purple-500 rounded-md  hover:bg-purple-500 hover:text-white transition-colors duration-300"
          >
            Buscar
          </button>
        </div>
      </div>

      <hr className="mt-10 mb-10" />
      <div>
        {error && (
          <p className="text-center text-red-500">Error al cargar el ranking: {errorResponse}</p>
        )}
        {isLoading ? (
          <Loader />
        ) : ranked?.length > 0 ? (
          ranked.map((rank, index) => (
            <RankingTop key={rank.id} data={rank} index={index} />
          ))
        ) : (
          <p className="text-center text-gray-500">Ups.. No se ha podido encontrar la empresa.</p>
        )}
      </div>
    </div>
  );
};

export default Ranking;
