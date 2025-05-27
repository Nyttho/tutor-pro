import { useEffect, useState } from "react";
import LessonCard from "../components/LessonCard";
import { Plus } from "lucide-react";
import { LessonType } from "../types/LessonType";
import { getLessons } from "../services/lessonSerice";

export default function Lesson() {
  const [lessons, setLessons] = useState<LessonType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedLessons: LessonType[] = await getLessons();
        if (fetchedLessons.length > 0) {
          setLessons(fetchedLessons);
        }
      } catch (err) {
        console.error("Error fetching lessons", err);
      }
    })();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Leçons</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus size={20} />
          Ajouter une leçon
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.length === 0 ? (
          <p>Aucun élève disponible</p> // Afficher un message si aucun étudiant
        ) : (
          lessons.map((lesson) => (
            <LessonCard lesson={lesson} key={lesson.id} />
          ))
        )}
      </div>
    </div>
  );
}
