import axios from "axios";
import { useEffect, useState } from "react";

const useAuth = () => {
  const AUTH_ENDPOINT = "/api/auth";
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const [errorResponse, setErrorResponse] = useState([]);
  const [isLoading, setIsLoading] = useState (false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const postRegisterUser = async (params) => {
    return handleRequest(() => api.post(`${AUTH_ENDPOINT}/register/user`, params));
  };

  const postRegisterCompany = async (params) => {
    return handleRequest(() => api.post(`${AUTH_ENDPOINT}/register/company`, params));
  };


  const postLogin = async (params) => {
    return handleRequest(() => api.post(`${AUTH_ENDPOINT}/login`, params));
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
      const user = localStorage.getItem("user");
      if (user) {
        try {
          setData(JSON.parse(user));
        } catch (error) {
          console.error("Error al parsear el usuario del localStorage:", error);
          setData(null); // Reiniciar los datos si hay un error
        }
      }
    }
  }, []);
  

  return {
    postLogin,
    postRegisterUser,
    postRegisterCompany,
    isAuthenticated,
    error,
    errorResponse,
    isLoading,
    data,
  };
};

export default useAuth;
