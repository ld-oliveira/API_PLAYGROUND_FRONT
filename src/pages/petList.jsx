import { useEffect, useState } from "react";
import "../styles/components/Petlist.scss";

// busca o token no endpoint do backend
async function getCsrfToken(API_BASE) {
  const res = await fetch(`${API_BASE}/users/csrf/`, {
    credentials: "include",
  });
  const data = await res.json();
  return data.csrfToken;
}

function PetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_BASE = "https://api-playground-back.onrender.com";

  useEffect(() => {
    async function fetchPets() {
      try {
        const csrftoken = await getCsrfToken(API_BASE);

        const response = await fetch(`${API_BASE}/pet/animais/`, {
          method: "GET",
          credentials: "include", // mantém cookies/sessão
          headers: {
            "X-CSRFToken": csrftoken, // mantém padrão igual aos outros
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar animais");
        }

        const data = await response.json();
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, [API_BASE]);

  if (loading) {
    return <p>Carregando animais...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
    <div className="pet-list-page">
      <h1>Lista de Animais</h1>

      {!loading && !error && pets.length === 0 && (
        <p className="empty-message">Nenhum animal cadastrado ainda.</p>
      )}

      {!loading && !error && pets.length > 0 && (
        <div className="pets-grid">
          {pets.map((pet) => (
            <div className="pet-card" key={pet.id}>
              <img src={pet.foto} alt={pet.nome} />
              <h2>{pet.nome}</h2>
              <p>
                <strong>Idade:</strong> {pet.idade}
              </p>
              <p>
              <strong>Dono:</strong> {pet.usuario?.username || "Anônimo"}
              </p>
              <div className="pet-comment">
                {pet.descricao || "Sem descrição"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default PetList;
