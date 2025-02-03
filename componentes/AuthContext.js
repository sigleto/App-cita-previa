import React, { createContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "@firebase/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true); // Usuario autenticado
      } else {
        setIsAuthenticated(false); // Usuario no autenticado
      }
    });

    return () => unsubscribe(); // Limpia el observador al desmontar
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
