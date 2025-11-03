import { createContext, useContext, useState, useEffect, useCallback } from "react";

const AuthContext = createContext();

const API_BASE = "https://api-playground-back.onrender.com";

async function getCsrfToken() {
  const res = await fetch(`${API_BASE}/users/csrf/`, { credentials: "include" });
  const data = await res.json(); // backend envia { csrfToken: "..." }
  return data.csrfToken;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE}/users/me/`, {
        method: "GET",
        credentials: "include",
      });
      if (!res.ok) {
        setUser(null);
        setIsAuthenticated(false);
        return;
      }
      const data = await res.json();
      setUser({
        id: data.id,
        username: data.username,
        email: data.email,
        is_staff: data.is_staff,
        is_superuser: data.is_superuser,
      });
      setIsAuthenticated(true);
    } catch {
      setUser(null);
      setIsAuthenticated(false);
    }
  }, []);

  useEffect(() => {
    (async () => {
      setAuthLoading(true);
      await refreshUser();   // reidrata no reload/F5 com base na sessão
      setAuthLoading(false);
    })();
  }, [refreshUser]);

  const login = useCallback(async ({ nome_login, senha_login }) => {
    const csrftoken = await getCsrfToken();

    const res = await fetch(`${API_BASE}/users/login/`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({ nome_login, senha_login }),
    });

    if (!res.ok) {
      // aqui pegamos a mensagem do servidor (ex.: 401)
      let msg = "Falha no login";
      try { msg = (await res.json()).error || msg; } catch { }
      throw new Error(msg);
    }

    // Tenta usar o usuário retornado pelo /login (conforme sugeri no backend)
    let data;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    if (data && data.user) {
      setUser({
        id: data.user.id,
        username: data.user.username,
        email: data.user.email,
        is_staff: data.user.is_staff,
        is_superuser: data.user.is_superuser,
      });
      setIsAuthenticated(true);
      return;
    }

    // Fallback: busca /me/ (caso o /login não retorne user)
    await refreshUser();
  }, [refreshUser]);

  const logout = useCallback(async () => {
    const csrftoken = await getCsrfToken();
    await fetch(`${API_BASE}/users/logout/`, {
      method: "POST",
      credentials: "include",
      headers: { "X-CSRFToken": csrftoken },
    });
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, authLoading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
