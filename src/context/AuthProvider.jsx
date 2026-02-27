import { useState } from "react";
import api from "../services/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  const loading = false; 

  const login = async (email, password) => {
    const response = await api.post("/api/login", {
      email,
      password,
    });

    const { token, id } = response.data;

    localStorage.setItem("token", token);
    setUser({ id, email, token });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};