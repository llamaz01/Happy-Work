// contexts/userProvider.js
import React, { createContext, useState, useContext, useEffect } from "react";
//import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  //const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem("userData")) || null);

  const login = (token, userInfo) => {
    setToken(token);
    setUserData(userInfo);
    localStorage.setItem("token", token);
    localStorage.setItem("userData", JSON.stringify(userInfo));
    //navigate("/");
  };

  const logout = () => {
    setToken(null);
    setUserData(null);
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    //navigate("/auth/login");
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
