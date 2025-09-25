import RegisterForm from "../components/CadForm";
import '../styles/components/Cad.scss';

function RegisterPage() {
  const handleRegister = async (formData) => {
    try {
      const response = await fetch("https://api-playground-back.onrender.com/users/cadastro/", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(formData)
      });

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
      } else {
        alert("Erro no cadastro. Verifique os dados.");
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
