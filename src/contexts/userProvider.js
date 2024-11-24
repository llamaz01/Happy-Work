import React, { createContext, useState, useContext } from "react";
import { history } from "../components/utils/history";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => localStorage.getItem("token") || null
  );
  const [userData, setUserData] = useState(() => {
    const storedData = localStorage.getItem("userData");
    try {
      return storedData ? JSON.parse(storedData) : null;
    } catch (error) {
      console.error("Error al analizar JSON desde localStorage:", error);
      return null;
    }
  });

  const login = (token, userInfo) => {
    if (userInfo == null) {
      console.error("No se pudieron obtener los datos");
      return;
    } else {
      setToken(token);
      setUserData(userInfo);
      localStorage.setItem("token", token);
      localStorage.setItem("userData", JSON.stringify(userInfo));
      history.push("/home");
      window.location.reload();
    }
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    history.push("/auth/login");
    window.location.reload();
  };

  return (
    <UserContext.Provider value={{ token, userData, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado para usar el contexto
export const useUser = () => {
  return useContext(UserContext);
};
