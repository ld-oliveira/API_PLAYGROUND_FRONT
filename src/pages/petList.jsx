import { useEffect, useState } from "react";
import "../styles/components/Petlist.scss";

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
  const [currentUser, setCurrentUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ id: null, nome: "", idade: "", descricao: "", foto: null });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState(null);

  const API_BASE = "https://api-playground-back.onrender.com";

  useEffect(() => {
    async function bootstrap() {
      try {
        const csrftoken = await getCsrfToken(API_BASE);

        const meResp = await fetch(`${API_BASE}/users/me/`, {
          method: "GET",
          credentials: "include",
          headers: { "X-CSRFToken": csrftoken },
        });
        if (meResp.ok) {
          const meData = await meResp.json();
          setCurrentUser(meData);
        }

        const response = await fetch(`${API_BASE}/pet/animais/`, {
          method: "GET",
          credentials: "include",
          headers: { "X-CSRFToken": csrftoken },
        });
        if (!response.ok) throw new Error("Erro ao carregar animais");
        const data = await response.json();
        setPets(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    bootstrap();
  }, [API_BASE]);

  const openEdit = (pet) => {
    setSaveError(null);
    setForm({
      id: pet.id,
      nome: pet.nome || "",
      idade: pet.idade ?? "",
      descricao: pet.descricao || "",
      foto: null,
    });
    setEditing(true);
  };

  const closeEdit = () => {
    setEditing(false);
    setForm({ id: null, nome: "", idade: "", descricao: "", foto: null });
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto") {
      setForm((f) => ({ ...f, foto: files && files[0] ? files[0] : null }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaveError(null);
      const csrftoken = await getCsrfToken(API_BASE);

      const fd = new FormData();
      fd.append("nome", form.nome);
      fd.append("idade", form.idade);
      fd.append("descricao", form.descricao);
      if (form.foto) fd.append("foto", form.foto);

      const resp = await fetch(`${API_BASE}/pet/animais/${form.id}/`, {
        method: "PATCH",
        credentials: "include",
        headers: { "X-CSRFToken": csrftoken },
        body: fd,
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(txt || "Erro ao salvar edição");
      }

      const updated = await resp.json();
      setPets((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
      closeEdit();
    } catch (e) {
      setSaveError("Não foi possível salvar. Verifique se você está logado e é o dono deste pet.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Carregando animais...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className="pet-list-page">
      <h1>Lista de Animais</h1>

      {pets.length === 0 ? (
        <p className="empty-message">Nenhum animal cadastrado ainda.</p>
      ) : (
        <div className="pets-grid">
          {pets.map((pet) => {
            const isOwner =
              currentUser && pet?.usuario?.id && Number(pet.usuario.id) === Number(currentUser.id);

            return (
              <div className="pet-card" key={pet.id}>
                <img
                  src={pet.foto?.startsWith("http") ? pet.foto : `${API_BASE}${pet.foto}`}
                  alt={pet.nome}
                />
                <h2>{pet.nome}</h2>
                <p><strong>Idade:</strong> {pet.idade}</p>
                <p><strong>Dono:</strong> {pet.usuario?.username || "Anônimo"}</p>

                {}
                <div className="pet-comment">
                  {pet.descricao || "Sem descrição"}
                </div>

                {}
                <button className="editar-btn" onClick={() => openEdit(pet)}>
                  Editar
              </button>
              </div>
            );
          })}
        </div>
      )}

      {editing && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Editar pet</h3>

            <label>
              Nome
              <input name="nome" value={form.nome} onChange={handleChange} />
            </label>

            <label>
              Idade
              <input name="idade" type="number" value={form.idade} onChange={handleChange} />
            </label>

            <label>
              Descrição
              <textarea name="descricao" value={form.descricao} onChange={handleChange} />
            </label>

            <label className="file-label">
              Foto (opcional)
              <input name="foto" type="file" accept="image/*" onChange={handleChange} />
            </label>

            {saveError && <p className="error">{saveError}</p>}

            <div className="modal-actions">
              <button className="cancel-btn" onClick={closeEdit} disabled={saving}>
                Cancelar
              </button>
              <button className="editar-btn" onClick={handleSave} disabled={saving}>
                {saving ? "Salvando..." : "Salvar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PetList;
