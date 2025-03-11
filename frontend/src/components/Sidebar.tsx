import {
  Calendar,
  Users,
  BookOpen,
  Layout as LayoutIcon,
  LogOut,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();

  const menuItems = [
    { icon: LayoutIcon, text: "Tableau de bord", path: "/" },
    { icon: Calendar, text: "Calendrier", path: "/calendar" },
    { icon: Users, text: "Élèves", path: "/students" },
    { icon: BookOpen, text: "Leçons", path: "/lessons" },
  ];

  return (
    <div className="h-screen w-64 bg-indigo-800 text-white p-4 fixed left-0 top-0 flex flex-col">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">TutorPro</h1>
      </div>

      {/* User profile */}
      <div className="mb-8 flex items-center space-x-3 p-3 bg-indigo-700/50 rounded-lg">
        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-indigo-200">{user?.email}</div>
        </div>
      </div>

      <nav className="flex-1">
      {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
                isActive ? "bg-indigo-700" : "hover:bg-indigo-700/50"
              }`}
            >
              <Icon size={20} />
              <span>{item.text}</span>
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700/50 transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span>Déconnexion</span>
      </button>
    </div>
  );
}
