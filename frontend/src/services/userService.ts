const backendUrl = import.meta.env.VITE_BACKEND;

export async function updateUser(id: number, data: { name: string; email: string; password?: string }) {
  const res = await fetch(`${backendUrl}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const text = await res.text(); // on lit le corps une fois
    try {
      const json = JSON.parse(text);
      throw new Error(json.error || "Erreur serveur");
    } catch {
      throw new Error(text || "Erreur serveur");
    }
  }

  return res.json();
}



export async function deleteUser(id: number) {
  const res = await fetch(`/api/users/${id}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Erreur serveur");
  }

  return res.json();
}
