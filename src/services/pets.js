import { API_BASE, getAuthHeader } from "./api";

// Listar todos os animais (aberto para qualquer usuário)
export async function listPets() {
  const response = await fetch(`${API_BASE}/api/animais/`);
  if (!response.ok) {
    throw new Error("Erro ao buscar animais");
  }
  return response.json();
}

// Adicionar um novo animal (precisa estar logado)
export async function addPet(petData) {
  const response = await fetch(`${API_BASE}/api/animais/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...getAuthHeader(),
    },
    body: JSON.stringify(petData),
  });

  if (!response.ok) {
    throw new Error("Erro ao adicionar animal");
  }
  return response.json();
}
