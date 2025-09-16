import { useState } from "react";

function LoginForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="login-form">
      <h2>Login</h2>

      <div className="form-group">
        <label>Usuário</label>
        <input 
          type="text" 
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Digite seu usuário"
          required
        />
      </div>

      <div className="form-group">
        <label>Senha</label>
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Digite sua senha"
          required
        />
      </div>

      <button type="submit">Entrar</button>
    </form>
  );
}

export default LoginForm;
