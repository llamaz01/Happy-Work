import axios from "axios";
import { useState } from "react";

const useAuth = () => {
  const AUTH_ENDPOINT = "/auth";
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
        setErrorResponse(error.response.data);
        console.error("Error con respuesta del servidor:", error.response.data);
      } else if (error.request) {
        console.error("No se recibió respuesta del servidor:");
      } else {
        console.error("Error al configurar la solicitud:");
      }

      setIsLoading(false);
      return {
        error: error.response?.data || error.message || "Error desconocido",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const postRegister = async (params) => {
    return handleRequest(() => api.post(`${AUTH_ENDPOINT}/register`, params));
  };

  const postLogin = async (params) => {
    handleRequest(() => api.post(`${AUTH_ENDPOINT}/login`, params));
  };

  return {
    postLogin,
    postRegister,
    error,
    errorResponse,
    isLoading,
    data,
  };
};

export default useAuth;