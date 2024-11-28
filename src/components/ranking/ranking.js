import React, { useEffect, useState } from "react";
import RankingTop from "./rankings-top";
import { FaSearch } from "react-icons/fa";
import useRanking from "../../hooks/useRanking";
import Loader from "../common/loader/loader";

const Ranking = () => {
    const { fetchRanked,
        error,
        errorResponse,
        isLoading,
        data } = useRanking();
    const [ranked, setRanked] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };


    const fetchRanking = async (companyName = "") => {
        try {
            const response = await fetchRanked(companyName);
            setRanked(response);
        } catch (error) {
            console.error("Error fetching ranking:", error);
        }
    };

    const handleSearchSubmit = () => {
        fetchRanking(searchTerm);
    };

    useEffect(() => {
        fetchRanking();
    }, []);


    return (
        <div className="pt-6 max-w-5xl mx-auto">
            <div className="flex justify-between items-center flex-col lg:flex-row mt-4 lg:mt-0">
                <div className="text-blue-950 font-bold text-4xl p-4 rounded-md">
                    <h1>Ranking</h1>
                </div>
                <div className="flex">
                    <div className="flex items-center border border-gray-300 rounded-md p-2">
                        <FaSearch className="text-blue-950 mr-2" />
                        <input
                            type="text"
                            placeholder="Busca la Empresa"
                            value={searchTerm}
                            onChange={handleSearch}
                            className="flex-1 focus:outline-none" />
                    </div>
                    <button
                        onClick={handleSearchSubmit}
                        className="ml-2 p-2 bg-white text-blue-500 border-2 border-blue-500 rounded-md hover:border-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-300"
                    >
                        Buscar
                    </button>
                </div>
            </div>
            {error && (
                <p className="text-center text-red-500">Error al cargar el ranking: {errorResponse}</p>
            )}
            {isLoading ? (
                <Loader />
            ) : ranked?.length > 0 ? (
                ranked.map((rank) => (
                    <RankingTop key={rank.id} data={rank} />
                ))
            ) : (
                <p className="text-center text-gray-500">Ups.. No se ha podido encontrar la empresa.</p>
            )}
        </div>
    );
};

export default Ranking;
