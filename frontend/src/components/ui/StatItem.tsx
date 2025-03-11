import { LucideProps } from "lucide-react";

interface StatItemProps {
  icon: React.FC<LucideProps>;
  title: string;
  color: string;
  value: string | number;
}

export default function StatItem({
  icon: Icon,
  title,
  color,
  value,
}: StatItemProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex items-center space-x-4">
      <div className={`${color} p-3 rounded-lg`}>
        <Icon className="text-white" size={24} />
      </div>
      <div>
        <p className="text-sm text-gray-600">{title}</p>
        <p className="text-2xl font-semibold text-gray-900">{value}</p>
      </div>
    </div>
  );
}
