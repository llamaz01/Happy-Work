import axios from "axios";
import { useState } from "react";

const useRanking = () => {
  const RANKING_ENDPOINT = "/company/ranking";

  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorResponse, setErrorResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  const handleRequest = async (requestFunction) => {
    setIsLoading(true);
    setError(false);
    setErrorResponse([]);
    try {
      const res = await requestFunction();
      setData(res.data);
      return res.data;
    } catch (error) {
      setError(true);

      if (error.response) {
        if (error.response.status === 404) {
          setErrorResponse("No se encontraron empresas.");
        } else {
          setErrorResponse(error.response.data);
        }
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:");
      } else {
        console.error("Error al configurar la solicitud:");
      }

      return {
        error: error.response?.data || error.message || "Error desconocido",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRanked = async (companyName = "") => {
    return handleRequest(() => api.get(`${RANKING_ENDPOINT}?companyName=${companyName}`));
  };


  return {
    fetchRanked,
    error,
    errorResponse,
    isLoading,
    data,
  };
};

export default useRanking;
