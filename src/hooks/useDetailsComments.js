import axios from "axios";
import { useState } from "react";

const useDetailsComments = () => {
  const AVERAGE_COMMENTS_ENDPOINT = "/comments/overall-average";
  const COMMENTS_COMPANY_ENDPOINT = "/comments/search";

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
          setErrorResponse("No se encontraron comentarios para esta empresa.");
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

  const fetchAverageComments = async (companyId) => {
    if (!companyId) {
      throw new Error("El ID de la empresa es requerido para obtener el promedio.");
    }
    return handleRequest(() => api.get(`${AVERAGE_COMMENTS_ENDPOINT}?id=${companyId}`));
  };

  const fetchCommentsCompany = async (companyId) => {
    if (!companyId) {
      throw new Error("El ID de la empresa es requerido.");
    }
    return handleRequest(() => api.get(`${COMMENTS_COMPANY_ENDPOINT}?id=${companyId}`));
  };

  return {
    fetchAverageComments,
    fetchCommentsCompany,
    error,
    errorResponse,
    isLoading,
    data,
  };
};

export default useDetailsComments;
