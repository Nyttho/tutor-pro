import { useState } from "react";
const Login = () => {
  //   const [email, setEmail] = useState(null);
  //   const [password, setPassword] = useState("password");
  const [error, setError] = useState("");
  //   const [isLoading, setIsLoading] = useState(false);

  //   const handleSubmit = async (e: React.FormEvent) => {
  //     e.preventDefault();
  //     setError("");
  //     setIsLoading(true);

  //     try {
  //       await login(email, password);
  //     } catch (err) {
  //       setError("Email ou mot de passe incorrect");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  const handleSubmit = () => {
    return "";
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
        </form>
      </div>
    </div>
  );
};

export default Login;
