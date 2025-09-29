// URL base da API
// Você pode definir no .env: REACT_APP_API_BASE=https://api-playground-back.onrender.com
export const API_BASE = process.env.REACT_APP_API_BASE || "https://api-playground-back.onrender.com";

// Função para retornar o cabeçalho de autenticação (quando o usuário estiver logado)
export function getAuthHeader() {
  const token =
    localStorage.getItem("authToken") ||
    localStorage.getItem("token") ||
    localStorage.getItem("access") ||
    null;

  if (!token) return {};

  // Detecta se o token é JWT (com 3 partes separadas por ponto)
  const isJWT = token.split(".").length === 3;
  const prefix = isJWT ? "Bearer " : "Token ";

  return { Authorization: prefix + token };
}
