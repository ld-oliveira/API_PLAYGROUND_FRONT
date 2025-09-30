import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const handleLogin = async (formData) => {
    try {
      await ensureCsrf(API_BASE);
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(`${API_BASE}/users/login/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken, 
        },
        body: JSON.stringify({
          nome_login: formData.username,
          senha_login: formData.password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.status === "ok") {
        alert("Login realizado com sucesso!");
        console.log("Usuário logado:", data);
        setError(null);

        // guarda no localStorage
        localStorage.setItem("user", JSON.stringify(data));

        // redireciona após 1s
        setTimeout(() => navigate("/"), 1000);
      } else {
        setError(data.error || "Usuário ou senha inválidos.");
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
