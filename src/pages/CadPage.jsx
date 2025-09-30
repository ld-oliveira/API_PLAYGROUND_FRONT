import { useNavigate } from "react-router-dom";
import CadForm from "../components/CadForm";
import "../styles/components/Cad.scss";

// busca o token no endpoint do backend
async function getCsrfToken(API_BASE) {
  const res = await fetch(`${API_BASE}/users/csrf/`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}

function CadPage() {
  const API_BASE = "https://api-playground-back.onrender.com";
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
      const csrftoken = await getCsrfToken(API_BASE);

      const response = await fetch(`${API_BASE}/users/cadastro/`, {
        method: "POST",
        credentials: "include", // mantém cookies de sessão
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: JSON.stringify(formData), // agora bate com o header
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        setTimeout(() => navigate("/LoginPage"), 2000);
      } else {
        const data = await response.json().catch(() => ({}));
        alert(data.error || "Erro no cadastro. Verifique os dados.");
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="register-page">
      <CadForm onSubmit={handleRegister} />
    </div>
  );
}

export default CadPage;
