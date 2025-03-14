import { Calendar, Users, BookOpen, TrendingUp } from "lucide-react";
import StatItem from "../components/ui/StatItem";
import { useState, useEffect } from "react";
import { getStudents, getCourses, getNextCourses } from "../utils/getStats";
import { CourseType } from "../types/CourseType";
import CourseListElement from "../components/CourseListElement";

export default function Dashboard() {
  const [studentsNb, setStudentNb] = useState(0);
  const [coursesNb, setCoursesNb] = useState(0);
  const [pendingCourses, setPendingCourses] = useState(0);
  const [monthAmount, setMonthAmount] = useState(0);
  const [courses, setCourses] = useState<CourseType[]>([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;

  useEffect(() => {
    (async () => {
      try {
        const students = await getStudents();
        const count = students.length;
        if (count !== undefined) {
          setStudentNb(count);
        }
        const monthCourses = await getCourses(month, year);
        if (monthCourses !== undefined || monthCourses.length !== 0) {
          setCoursesNb(monthCourses.length);
          const payedCourses = monthCourses.filter(
            (course: CourseType) => course.status === "paid"
          );
          const unpayedCourses = monthCourses.length - payedCourses.length;
          setPendingCourses(unpayedCourses);
          setMonthAmount(
            payedCourses.reduce(
              (acc: number, course: CourseType) => acc + course.price,
              0
            )
          );
        }
        const nextCourses = await getNextCourses(10);
        setCourses(nextCourses);
      } catch (err) {
        console.error("Error fetching datas", err);
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
      value: coursesNb,
      icon: Calendar,
      color: "bg-green-500",
    },
    {
      title: "Revenus du mois",
      value: `${monthAmount}€`,
      icon: TrendingUp,
      color: "bg-purple-500",
    },
    {
      title: "Paiements en attente",
      value: pendingCourses,
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
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Prochains Cours</h2>
        <div className="space-y-4">
          {courses.map((course) => (
            <CourseListElement course={course} key={course.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
