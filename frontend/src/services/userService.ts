export async function updateUser(id: number, data: { name: string; email: string; password?: string }) {
  const res = await fetch(`/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const { error } = await res.json();
    throw new Error(error || "Erreur serveur");
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
