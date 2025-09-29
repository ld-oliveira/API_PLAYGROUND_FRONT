import { useState } from "react";
import { API_BASE, getAuthHeader } from "../services/api";
import "../styles/components/Addpet.scss";

function AddPet() {
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [descricao, setDescricao] = useState("");
  const [foto, setFoto] = useState(null);
  const [mensagem, setMensagem] = useState("");

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
      const response = await fetch(`${API_BASE}/pet/animais/`, {
        method: "POST",
        headers: {
          ...getAuthHeader(), // insere o token JWT automaticamente
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Erro ao cadastrar animal");
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
        <p className={`message ${mensagem.includes("sucesso") ? "success" : "error"}`}>
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
          <label>Descrição, curiosidade ou uma historia do seu pet:</label>
          <textarea
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Fotinha:</label>
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
