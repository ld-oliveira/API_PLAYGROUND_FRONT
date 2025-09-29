import { useEffect, useState } from "react";
import { listPets } from "../services/pets";
import '../styles/components/Petlist.scss';

function PetList() {
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchPets() {
      try {
        const data = await listPets();
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchPets();
  }, []);

  if (loading) {
    return <p>Carregando animais...</p>;
  }

  if (error) {
    return <p>Erro: {error}</p>;
  }

  return (
  <div className="pet-list-page">
    <h1>Lista de Animais</h1>
    {loading && <p className="loading-message">Carregando animais...</p>}
    {error && <p className="error-message">Erro: {error}</p>}
    {!loading && !error && pets.length === 0 && (
      <p className="empty-message">Nenhum animal cadastrado ainda.</p>
    )}
    {!loading && !error && pets.length > 0 && (
      <div className="pets-grid">
        {pets.map((pet) => (
          <div className="pet-card" key={pet.id}>
            {pet.foto && <img src={pet.foto} alt={pet.nome} />}
            <h2>{pet.nome}</h2>
            <p><strong>Idade:</strong> {pet.idade}</p>
            <p><strong>Dono:</strong> {pet.usuario?.username || "Anônimo"}</p>
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
