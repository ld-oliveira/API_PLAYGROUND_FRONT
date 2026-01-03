import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "../styles/components/ResetSenha.scss";

async function getCsrfToken() {
    const res = await fetch("/users/csrf/", {
        credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
}

const ResetSenha = () => {
    const navigate = useNavigate();

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    const [senha, setSenha] = useState("");
    const [confirmarSenha, setConfirmarSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmacao, setMostrarConfirmacao] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!token) return;
        if (!senha || !confirmarSenha) return;
        if (senha !== confirmarSenha) return;

        try {
            const csrfToken = await getCsrfToken();

            await fetch("/users/reset-senha/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({
                    token,
                    new_password: senha,
                }),
            });

            navigate("/login");
        } catch (err) {
            console.error("Erro ao redefinir senha:", err);
        }
    };

    if (!token) {
        return (
            <section className="reset-senha-page">
                <div className="div-bloco">
                    <div className="superior">
                        <p className="title-email">Redefinir senha</p>
                        <p>Link inválido ou expirado.</p>
                    </div>

                    <div className="inferior">
                        <p>
                            Volte para a tela de "Esqueci minha senha" e solicite um novo link.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="reset-senha-page">
            <form className="div-bloco" onSubmit={handleSubmit}>
                <div className="superior">
                    <p className="title-email">Redefinir senha</p>

                    <label className="label-campo">
                        <span className="label-text">Nova senha</span>

                        <div className="campo-senha">
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                value={senha}
                                onChange={(e) => setSenha(e.target.value)}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="toggle-senha"
                                onClick={() => setMostrarSenha((v) => !v)}
                                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                            >
                                {mostrarSenha ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </label>

                    <label className="label-campo">
                        <span className="label-text">Confirme sua senha</span>

                        <div className="campo-senha">
                            <input
                                type={mostrarConfirmacao ? "text" : "password"}
                                value={confirmarSenha}
                                onChange={(e) => setConfirmarSenha(e.target.value)}
                                autoComplete="new-password"
                            />

                            <button
                                type="button"
                                className="toggle-senha"
                                onClick={() => setMostrarConfirmacao((v) => !v)}
                                aria-label={mostrarConfirmacao ? "Ocultar confirmação" : "Mostrar confirmação"}
                            >
                                {mostrarConfirmacao ? <FiEyeOff /> : <FiEye />}
                            </button>
                        </div>
                    </label>

                    <button type="submit">Salvar nova senha</button>
                </div>

                <div className="inferior">
                    <p>Digite e confirme sua nova senha para continuar</p>
                </div>
            </form>
        </section>
    );
};

export default ResetSenha;
