import { useNavigate } from "react-router-dom";
import CadForm from "../components/CadForm";
import "../styles/components/Cad.scss";

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

function CadPage() {
  const API_BASE = "https://api-playground-back.onrender.com";
  const navigate = useNavigate();

  const handleRegister = async (formData) => {
    try {
     await ensureCsrf(API_BASE);
      const csrftoken = getCookie("csrftoken");
      const response = await fetch(`${API_BASE}/users/cadastro/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: new URLSearchParams(formData),
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
