import { useState } from "react";
import {
  Calendar,
  Users,
  BookOpen,
  Layout as LayoutIcon,
  LogOut,
  Menu as MenuIcon,
  X as CloseIcon,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import MenuItem from "./ui/MenuItem";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { icon: LayoutIcon, text: "Tableau de bord", path: "/" },
    { icon: Calendar, text: "Calendrier", path: "/calendar" },
    { icon: Users, text: "Élèves", path: "/students" },
    { icon: BookOpen, text: "Leçons", path: "/lessons" },
  ];

  return (
    <>
      {/* Burger menu visible seulement sur mobile */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setIsOpen(true)}>
          <MenuIcon size={28} className="text-indigo-800" />
        </button>
      </div>

      {/* Sidebar desktop */}
      <div className="hidden md:flex h-screen w-64 bg-indigo-800 text-white p-4 fixed left-0 top-0 flex-col">
        <SidebarContent user={user} logout={logout} menuItems={menuItems} />
      </div>

      {/* Sidebar mobile overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 md:hidden">
          <div className="h-full w-64 bg-indigo-800 text-white p-4 flex flex-col">
            <button
              className="self-end mb-4"
              onClick={() => setIsOpen(false)}
            >
              <CloseIcon size={24} />
            </button>
            <SidebarContent user={user} logout={logout} menuItems={menuItems} />
          </div>
        </div>
      )}
    </>
  );
}

// Extraire la partie réutilisable dans un composant interne
function SidebarContent({ user, logout, menuItems }: any) {
  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold">TutorPro</h1>
      </div>
      <div className="mb-8 flex items-center space-x-3 p-3 bg-indigo-700/50 rounded-lg">
        <div>
          <div className="font-medium">{user?.name}</div>
          <div className="text-sm text-indigo-200">{user?.email}</div>
        </div>
      </div>
      <nav className="flex-1">
        {menuItems.map((item: any) => (
          <MenuItem
            icon={item.icon}
            text={item.text}
            path={item.path}
            key={item.path}
          />
        ))}
      </nav>
      <button
        onClick={logout}
        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-indigo-700/50 transition-colors mt-auto"
      >
        <LogOut size={20} />
        <span>Déconnexion</span>
      </button>
    </>
  );
}
