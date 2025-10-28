import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // importado para atualizar o estado global
import LoginForm from "../components/LoginForm";
import "../styles/components/Login.scss";

// busca o token no endpoint do backend
async function getCsrfToken(API_BASE) {
  const res = await fetch(`${API_BASE}/users/csrf/`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}

function LoginPage() {
  const API_BASE = "https://api-playground-back.onrender.com";
  const navigate = useNavigate();
  const { login } = useAuth(); // usado para atualizar o contexto após login

  const handleLogin = async (formData) => {
    try {
      const csrftoken = await getCsrfToken(API_BASE);

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

        if (data.token) localStorage.setItem("authToken", data.token);
          login(data.token, data.user); // chama mesmo sem token (cookie de sessão)


        setTimeout(() => navigate("/"), 2000);
      } else {
        alert(data.error || "Usuário ou senha inválidos.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
