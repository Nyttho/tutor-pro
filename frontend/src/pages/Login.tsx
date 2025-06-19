import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { LogIn } from "lucide-react";
import { Link } from "react-router-dom";
import FormInput from "../components/ui/FormInput";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await login(email, password);
    } catch (err) {
      setError("Email ou mot de passe incorrect");
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
          <p className="mt-2 text-center text-sm text-gray-600">
            Connectez-vous à votre compte
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div
              className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              {error}
            </div>
          )}
          <div className="rounded-md shadow-sm -space-y-px">
            <FormInput
              name="email"
              type="email"
              isRequired={true}
              value={email}
              onChange={setEmail}
              placeholder="Email"
            />
            <FormInput
              name="password"
              type="password"
              isRequired={true}
              value={password}
              onChange={setPassword}
              placeholder="Mot de passe"
            />
          </div>
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LogIn
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              {isLoading ? "Connexion..." : "Se connecter"}
            </button>
          </div>
          <p className="text-center">
            Vous n'avez pas de compte ?{" "}
            <Link to="/subscribe" className="underline text-indigo-500">
              S'inscrire
            </Link>
          </p>
          <p className="text-center text-xs text-gray-500 mt-4">
            En vous connectant, vous acceptez notre{" "}
            <Link
              to="/private-policy"
              className="underline text-indigo-500 hover:text-indigo-700"
            >
              politique de confidentialité
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
