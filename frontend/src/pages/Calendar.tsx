import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";
import CalendarDay from "../components/CalendarDay";
import { getCourses } from "../services/getStats";
import { CourseType } from "../types/CourseType";

export default function Calendar() {
  // État pour stocker le mois et l'année affichés
  const today = new Date();
  const [month, setMonth] = useState(today.getMonth()); // Index du mois (0 = Janvier)
  const [year, setYear] = useState(today.getFullYear());
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    (async () => {
      const fetchedCourses = await getCourses(month + 1, year);
      setCourses(fetchedCourses);
    })();
  }, [month]);
  // Fonction pour aller au mois précédent
  const prevMonth = () => {
    setMonth((prev) => {
      if (prev === 0) {
        setYear(year - 1);
        return 11;
      }
      return prev - 1;
    });
  };

  // Fonction pour aller au mois suivant
  const nextMonth = () => {
    setMonth((prev) => {
      if (prev === 11) {
        setYear(year + 1);
        return 0;
      }
      return prev + 1;
    });
  };

  // Obtenir les informations du mois sélectionné
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  // Adapter le premier jour (Dimanche = 0, doit être à la fin en France)
  const adjustedFirstDay = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  // Générer les jours du mois et les cases vides au début
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: adjustedFirstDay });

  // Nom du mois en français
  const currentMonth = new Date(year, month).toLocaleString("fr-FR", {
    month: "long",
  });

  // Fonction pour filtrer les cours pour un jour donné
  const getCoursesForDay = (day: number) => {
    const dayStart = new Date(year, month, day, 0, 0, 0, 0).toISOString();
    const dayEnd = new Date(year, month, day, 23, 59, 59, 999).toISOString();
    return courses.filter(
      (course) =>
        new Date(course.scheduledAt).toISOString() >= dayStart &&
        new Date(course.scheduledAt).toISOString() <= dayEnd
    );
  };

  return (
    <div className="space-y-8">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div className="flex items-center mx-auto text-indigo-600">
          <button onClick={prevMonth} className="cursor-pointer">
            <ArrowBigLeft size={25} />
          </button>
          <h1 className="text-3xl font-bold text-gray-900 w-[400px] text-center">
            Calendrier {currentMonth} {year}
          </h1>
          <button onClick={nextMonth} className="cursor-pointer">
            <ArrowBigRight size={25} />
          </button>
        </div>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer">
          Ajouter un cours
        </button>
      </div>

      {/* Calendrier */}
      <div className="bg-gray-100 rounded-xl shadow-sm">
        {/* Jours de la semaine */}
        <div className="grid grid-cols-7 gap-px border-b border-gray-300">
          {["Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"].map((day) => (
            <div
              key={day}
              className="px-4 py-3 text-center font-semibold text-gray-900 bg-gray-50"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Cases du calendrier */}
        <div className="grid grid-cols-7 gap-1 p-1">
          {/* Jours vides avant le 1er du mois */}
          {emptyDays.map((_, index) => (
            <div key={index} className="h-32 bg-gray-100" />
          ))}

          {/* Jours du mois */}
          {days.map((day) => {
            const isToday =
              day === today.getDate() &&
              month === today.getMonth() &&
              year === today.getFullYear();
            const className = `h-32 flex flex-col items-start justify-start text-md text-gray-600 font-semibold p-2 bg-white hover:bg-gray-200 cursor-pointer overflow-y-auto ${
              isToday ? "border-2 border-indigo-500" : ""
            }`;
            const dayCourses = getCoursesForDay(day);
            return (
              <Link to={`/courses?year=${year}&month=${month}&day=${day}`} key={day}>
                <CalendarDay
                  className={className}
                  day={day}  
                  courses={dayCourses}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
