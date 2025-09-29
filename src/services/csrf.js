export function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    const cookies = document.cookie.split(";");
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

export async function ensureCsrf(API_BASE) {
  // Faz o navegador receber/atualizar o cookie 'csrftoken'
  await fetch(`${API_BASE}/csrf/`, {
    method: "GET",
    credentials: "include",
  });
}
