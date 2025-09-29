import { useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [formData, setFormData] = useState({
    nome_cad: "",
    email_cad: "",
    senha_1: "",
    senha_2: ""
  });

  const [mensagem, setMensagem] = useState({ texto: "", tipo: "" }); 
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nome_cad || !formData.email_cad || !formData.senha_1 || !formData.senha_2) {
      setMensagem({ texto: "Preencha todos os campos.", tipo: "erro" });
      return;
    }

    if (formData.senha_1 !== formData.senha_2) {
      setMensagem({ texto: "As senhas não coincidem!", tipo: "erro" });
      return;
    }

    try {
      const response = await fetch("https://api-playground-back.onrender.com/users/cadastro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMensagem({ texto: "Cadastro realizado com sucesso!", tipo: "sucesso" });
        setTimeout(() => navigate("/LoginPage"), 2000); // redireciona após 2s
      } else {
        setMensagem({ texto: data.erro || "Erro no cadastro!", tipo: "erro" });
      }
    } catch (error) {
      console.error("Erro ao conectar com o backend:", error);
      setMensagem({ texto: "Não foi possível conectar com o servidor.", tipo: "erro" });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="register-form">
      <h2>Cadastro</h2>

      {mensagem.texto && (
        <p className={mensagem.tipo === "sucesso" ? "msg-sucesso" : "msg-erro"}>
          {mensagem.texto}
        </p>
      )}

      <div className="form-group">
        <label>Usuário</label>
        <input
          type="text"
          name="nome_cad"
          value={formData.nome_cad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email</label>
        <input
          type="email"
          name="email_cad"
          value={formData.email_cad}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input
          type="password"
          name="senha_1"
          value={formData.senha_1}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Confirmação de Senha</label>
        <input
          type="password"
          name="senha_2"
          value={formData.senha_2}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit">Cadastrar</button>
    </form>
  );
}

export default RegisterForm;
