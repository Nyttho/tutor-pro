import { LucideProps } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface MenuItemProps {
  icon: React.FC<LucideProps>;
  text: string;
  path: string;
}
export default function MenuItem({ icon: Icon, text, path }: MenuItemProps) {
  const location = useLocation();
  const isActive = location.pathname === path;

  return (
    <Link
      to={path}
      className={`flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
        isActive ? "bg-indigo-700" : "hover:bg-indigo-700/50"
      }`}
    >
      <Icon size={20} />
      <span>{text}</span>
    </Link>
  );
}
