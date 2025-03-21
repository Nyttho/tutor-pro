import { useEffect, useState } from "react";
import LessonCard from "../components/LessonCard";
import { Plus } from "lucide-react";
import { LessonType } from "../types/LessonType";
import { getLessons } from "../utils/lessons";

export default function Lesson() {
  // const mockLesson = [
  //   {
  //     id: 2,
  //     name: "list of irregular verbs",
  //     content: "description de la leçon",
  //     subject: "english",
  //     userId: 2,
  //     createdAt: "2025-02-17T14:18:40.787Z",
  //     createdBy: 2,
  //     fileId: 1,
  //     linkId: 4,
  //   },
  //   {
  //     id: 13,
  //     name: "pentatonics",
  //     content: "description de la leçon",
  //     subject: "guitar",
  //     userId: 2,
  //     createdAt: "2025-03-11T16:40:45.399Z",
  //     createdBy: 2,
  //     fileId: null,
  //     linkId: 15,
  //   },
  // ];

  const [lessons, setLessons] = useState<LessonType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const fetchedLesson: LessonType[] = await getLessons();
        setLessons(fetchedLesson);
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
