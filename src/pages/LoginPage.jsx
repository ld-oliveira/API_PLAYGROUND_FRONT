import LoginForm from "../components/LoginForm";
import '../styles/components/Login.scss';

function LoginPage() {
  const handleLogin = (formData) => {
    console.log("Dados do formulário:", formData);
    alert(`Login simulado!\nUsuário: ${formData.username}`);
  };

  return (
    <div className="login-page">
      <LoginForm onSubmit={handleLogin} />
    </div>
  );
}

export default LoginPage;
