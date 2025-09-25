import { useState } from "react";
import LoginForm from "../components/LoginForm";
import "../styles/components/Login.scss";

function LoginPage() {
  const [error, setError] = useState(null);

  const handleLogin = async (formData) => {
    try {
      const response = await fetch("https://api-playground-back.onrender.com/users/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome_login: formData.username,
          senha_login: formData.password,
        }),
        credentials: "include", // importante p/ cookies de sessão
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
