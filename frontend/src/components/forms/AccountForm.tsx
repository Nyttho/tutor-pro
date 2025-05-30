import { useState } from "react";
import { updateUser, deleteUser } from "../../services/userService";
import { useAuth } from "../../context/AuthContext";

interface AccountFormProps {
  onSuccess: () => void;
}

export default function AccountForm({ onSuccess }: AccountFormProps) {
  const { user, logout } = useAuth();

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await updateUser(user.id, formData);
      setSuccess("Compte mis à jour avec succès !");
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la mise à jour.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    const confirmed = confirm("Confirmer la suppression de votre compte ?");
    if (!confirmed) return;

    try {
      await deleteUser(user.id);
      logout();
    } catch (err: any) {
      setError(err.message || "Erreur lors de la suppression du compte.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}
      {success && <p className="text-green-600">{success}</p>}

      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Votre nom"
        required
        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg p-2 w-full bg-white text-black"
      />

      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Votre email"
        required
        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg p-2 w-full bg-white text-black"
      />

      <input
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        placeholder="Nouveau mot de passe (laisser vide pour ne pas changer)"
        className="border border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg p-2 w-full bg-white text-black"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      >
        {loading ? "Mise à jour..." : "Mettre à jour le compte"}
      </button>

      <button
        type="button"
        onClick={handleDelete}
        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
      >
        Supprimer le compte
      </button>
    </form>
  );
}
