import {
  Calendar,
  Users,
  BookOpen,
  Layout as LayoutIcon,
  LogOut,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import MenuItem from "./ui/MenuItem";

export default function Sidebar() {
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
          return (
            <MenuItem
              icon={item.icon}
              text={item.text}
              path={item.path}
              key={item.path}
            />
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
