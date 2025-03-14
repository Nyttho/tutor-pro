import { useState, useEffect } from "react";
import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
import { useAuth } from "../context/AuthContext";

export default function Subscribe() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [countryName, setCountryName] = useState("");
  const [cityName, setCityName] = useState("");
  const [postCode, setPostCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  // Vérifie si les mots de passe sont identiques
  const isPasswordIdentical = (pass1: string, pass2: string) => {
    if (pass1 !== pass2) {
      setError("Les mots de passe doivent être identiques");
      return false;
    }
    return true;
  };

  // Supprime l'erreur quand l'utilisateur modifie ses mots de passe
  useEffect(() => {
    setError("");
  }, [password, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!isPasswordIdentical(password, confirmPassword)) {
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND}/api/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
          countryName,
          cityName,
          postCode,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Une erreur est survenue");
      }

      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur inattendue s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            TutorPro
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">Créez un compte</p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}

          <div className="rounded-md shadow-sm -space-y-px">
            <FormInput name="name" type="text" isRequired value={name} onChange={setName} placeholder="Nom" />
            <FormInput name="email" type="email" isRequired value={email} onChange={setEmail} placeholder="Email" />
            <FormInput name="password" type="password" isRequired value={password} onChange={setPassword} placeholder="Mot de passe" />
            <FormInput name="confirmPassword" type="password" isRequired value={confirmPassword} onChange={setConfirmPassword} placeholder="Confirmez le mot de passe" />
            <FormInput name="countryName" type="text" isRequired value={countryName} onChange={setCountryName} placeholder="Pays" />
            <FormInput name="cityName" type="text" isRequired value={cityName} onChange={setCityName} placeholder="Ville" />
            <FormInput name="postCode" type="text" isRequired value={postCode} onChange={setPostCode} placeholder="Code Postal" />
          </div>

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <UserPlus className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
              </span>
              {isLoading ? "Inscription en cours..." : "S'inscrire"}
            </button>
          </div>

          <p className="text-center">
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className="underline text-indigo-500">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
