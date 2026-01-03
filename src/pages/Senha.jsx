import { useState } from "react";
import "../styles/components/Senha.scss";

async function getCsrfToken() {
    const res = await fetch("/users/csrf/", {
        credentials: "include",
    });
    const data = await res.json();
    return data.csrfToken;
}

const Senha = () => {
    const [email, setEmail] = useState("");

    const handleEnviar = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            const csrfToken = await getCsrfToken();

            await fetch("/users/esqueci-senha/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ email }),
            });
        } catch (err) {
            console.error("Erro ao solicitar redefinição:", err);
        }
    };

    const handleReenviar = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            const csrfToken = await getCsrfToken();

            await fetch("/users/esqueci-senha/", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    "X-CSRFToken": csrfToken,
                },
                body: JSON.stringify({ email }),
            });
        } catch (err) {
            console.error("Erro ao reenviar redefinição:", err);
        }
    };

    return (
        <section className="senha-page">
            <form className="senha-bloco" onSubmit={handleEnviar}>
                <div className="senha-superior">
                    <p className="senha-title">Digite seu email</p>

                    <label className="senha-label">
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="seu@email.com"
                        />
                    </label>

                    <button className="senha-submit" type="submit">
                        Enviar
                    </button>
                </div>

                <div className="senha-inferior">
                    <p className="senha-msg">
                        Se o email existir, você receberá um link para redefinir sua senha
                    </p>

                    <button
                        className="senha-reenviar"
                        type="button"
                        onClick={handleReenviar}
                    >
                        Enviar novamente
                    </button>
                </div>
            </form>
        </section>
    );
};

export default Senha;
