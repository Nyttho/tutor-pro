import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const PrivateRoutes = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    // Affiche un loader ou rien tant que la session est vérifiée
    return <div>Chargement...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
