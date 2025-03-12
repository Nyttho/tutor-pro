import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types/UserType";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND

  useEffect(() => {
    // Simulate checking for existing session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${backendUrl}/api/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password1: password,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Erreur de connexion");
    }

      const datas = await response.json();
      setUser(datas.user);
   
      localStorage.setItem("user", JSON.stringify(datas.user));
      navigate("/");
    } catch (err) {
      console.error("Erreur lors de la connexion:", err);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
