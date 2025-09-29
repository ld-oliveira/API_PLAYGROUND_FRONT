import { useState } from "react";
import "../styles/components/Addpet.scss";

// helper para ler o cookie CSRF do navegador
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + "=")) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// garante que o backend envie o cookie 'csrftoken'
async function ensureCsrf(API_BASE) {
  await fetch(`${API_BASE}/users/csrf/`, {
    method: "GET",
    credentials: "include",
  });
}

function AddPet() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const [mensagem, setMensagem] = useState("");

  const API_BASE = "https://api-playground-back.onrender.com";

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("idade", idade);
    formData.append("descricao", descricao);
    if (foto) {
      formData.append("foto", foto);
    }

    try {
      // 1) garante que o cookie 'csrftoken' foi setado pelo backend
      await ensureCsrf(API_BASE);

      // 2) pega o valor do cookie do navegador
      const csrftoken = getCookie("csrftoken");

      // 3) faz o POST já com o CSRF + sessionid
      const response = await fetch(`${API_BASE}/pet/animais/`, {
        method: "POST",
        credentials: "include", // manda sessionid + csrftoken
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formData, // não defina Content-Type, o navegador faz isso
      });

      if (!response.ok) {
        let detail = "Erro ao cadastrar animal";
        try {
          const data = await response.json();
          detail = data.detail || data.error || detail;
        } catch (_) {}
        throw new Error(detail);
      }

      setMensagem("Animal cadastrado com sucesso!");
      setNome("");
      setIdade("");
      setDescricao("");
      setFoto(null);
    } catch (err) {
      setMensagem("Erro: " + err.message);
    }
  };

  return (
    <div className="add-pet-page">
      <div className="add-pet-form">
        <h2>Cadastre seu Pet aqui.</h2>
        {mensagem && (
          <p
            className={`message ${
              mensagem.includes("sucesso") ? "success" : "error"
            }`}
          >
            {mensagem}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome ou apelido:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Idade:</label>
            <input
              type="number"
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Descrição, curiosidade ou uma história do seu pet:</label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Foto:</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
            />
          </div>

          <button type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}

export default AddPet;
