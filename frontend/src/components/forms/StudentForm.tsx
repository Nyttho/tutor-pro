import { useState } from "react";
import { createStudent } from "../../services/studentService";

interface StudentFormProps {
  onSuccess: () => void;
}

export default function StudentForm({ onSuccess }: StudentFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    address: "",
    city: "",
    postCode: "",
    country: "France",
    email: "",
    tel: "",
    age: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createStudent(formData);
      onSuccess(); // fermer la modale et refresh
    } catch (err: any) {
      setError(err?.response?.data?.error || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <p className="text-red-600">{error}</p>}

      <div className="grid grid-cols-2 gap-4">
        <input
          name="name"
          placeholder="Prénom"
          value={formData.name}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="surname"
          placeholder="Nom"
          value={formData.surname}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <input
        name="address"
        placeholder="Adresse"
        value={formData.address}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          name="postCode"
          placeholder="Code postal"
          value={formData.postCode}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
        <input
          name="city"
          placeholder="Ville"
          value={formData.city}
          onChange={handleChange}
          className="border p-2 rounded"
          required
        />
      </div>

      <input
        name="country"
        placeholder="Pays"
        value={formData.country}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />

      <div className="grid grid-cols-2 gap-4">
        <input
          name="tel"
          placeholder="Téléphone"
          value={formData.tel}
          onChange={handleChange}
          className="border p-2 rounded"
        />
        <input
          name="email"
          placeholder="Email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <input
        name="age"
        placeholder="Âge"
        type="number"
        value={formData.age}
        onChange={handleChange}
        className="border p-2 rounded w-full"
        required
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
      >
        {loading ? "Création en cours..." : "Créer l’élève"}
      </button>
    </form>
  );
}
