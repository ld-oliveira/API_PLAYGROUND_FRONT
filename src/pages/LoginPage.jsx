import { useState } from "react";
import LoginForm from "../components/LoginForm";
import "../styles/components/Login.scss";

// helper para ler o cookie CSRF
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// garante que o backend envie/atualize o cookie 'csrftoken'
async function ensureCsrf(API_BASE) {
  await fetch(`${API_BASE}/users/csrf/`, {
    method: "GET",
    credentials: "include",
  });
}

function LoginPage() {
  const [error, setError] = useState(null);
  const API_BASE = "https://api-playground-back.onrender.com";

  const handleLogin = async (formData) => {
    try {
      // 1) garante que o navegador tem o cookie 'csrftoken'
      await ensureCsrf(API_BASE);

      // 2) pega o valor do cookie
      const csrftoken = getCookie("csrftoken");

      // 3) faz o POST com o token no header
      const response = await fetch(`${API_BASE}/users/login/`, {
        method: "POST",
        credentials: "include", // envia cookies de sessão
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken, // csrf obrigatório
        },
        body: JSON.stringify({
          nome_login: formData.username,
          senha_login: formData.password,
        }),
      });

      const data = await response.json();

      if (response.ok && data.status === "ok") {
        alert("Login realizado com sucesso!");
        console.log("Usuário logado:", data);
        setError(null);
        localStorage.setItem("user", JSON.stringify(data));
      } else {
        setError(data.error || "Erro no login");
      }
    } catch (err) {
      console.error("Erro na requisição:", err);
      setError("Erro de conexão com o servidor");
    }
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} />
      {error && <p className="error-message">{error}</p>}
    </div>
  );
}

export default LoginPage;
