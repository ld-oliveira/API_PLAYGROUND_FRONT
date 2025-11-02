import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import "../styles/components/Login.scss";

function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (formData) => {
    try {
      await login({
        nome_login: formData.username,
        senha_login: formData.password,
      }); 
      navigate("/");
    } catch (error) {
      console.error("Erro de login:", error);
      alert("Usuário ou senha inválidos.");
    }
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
