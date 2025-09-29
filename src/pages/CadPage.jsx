import RegisterForm from "../components/CadForm";
import "../styles/components/Cad.scss";

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

function RegisterPage() {
  const API_BASE = "https://api-playground-back.onrender.com";

  const handleRegister = async (formData) => {
    try {
      // 1) garante o cookie csrftoken
      await ensureCsrf(API_BASE);

      // 2) lê o valor do cookie
      const csrftoken = getCookie("csrftoken");

      // 3) envia o POST com CSRF
      const response = await fetch(`${API_BASE}/users/cadastro/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "X-CSRFToken": csrftoken,
        },
        body: new URLSearchParams(formData),
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
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
      <RegisterForm onSubmit={handleRegister} />
    </div>
  );
}

export default RegisterPage;
