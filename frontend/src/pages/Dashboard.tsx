import { Calendar, Users, BookOpen, TrendingUp } from "lucide-react";
import StatItem from "../components/ui/StatItem";
import { useState, useEffect } from "react";
import { getStudentsNb } from "../utils/getStats";

export default function Dashboard() {
    const [studentsNb, setStudentNb] = useState(0)

    useEffect(() => {
        (async () => { 
          try {
            const count = await getStudentsNb();
            if (count !== undefined) {
              setStudentNb(count);
            }
          } catch (err) {
            console.error("Error fetching students", err);
          }
        })();
      }, []);

    
  const stats = [
    {
      title: "Élèves actifs",
      value: studentsNb,
      icon: Users,
      color: "bg-blue-500",
    },
    {
      title: "Cours ce mois",
      value: 0,
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Revenus du mois",
      value: `0€`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Paiements en attente",
      value: 0,
      icon: BookOpen,
      color: "bg-red-500",
    },
  ];
  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900">Tableau de bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatItem
            icon={stat?.icon}
            title={stat?.title}
            color={stat?.color}
            value={stat?.value}
            key={index}
          />
        ))}
      </div>
    </div>
  );
}
