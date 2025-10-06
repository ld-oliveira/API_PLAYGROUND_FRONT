import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();
const TOKEN_KEY = "token"; 

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem(TOKEN_KEY);
    setIsAuthenticated(Boolean(token));
  }, []);

  const login = useCallback((token, userData = null) => {
    localStorage.setItem(TOKEN_KEY, token);
    setIsAuthenticated(true);
    if (userData) setUser(userData);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(TOKEN_KEY);
    setIsAuthenticated(false);
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
