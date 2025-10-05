import { useState } from "react";
import "../styles/components/Addpet.scss";

async function getCsrfToken(API_BASE) {
  const res = await fetch(`${API_BASE}/users/csrf/`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
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
      formData.append("foto", foto, foto.name);
    }

    try {
      const csrftoken = await getCsrfToken(API_BASE);

      const response = await fetch(`${API_BASE}/pet/animais/`, {
        method: "POST",
        credentials: "include",
        headers: {
          "X-CSRFToken": csrftoken,
        },
        body: formData,
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
        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
