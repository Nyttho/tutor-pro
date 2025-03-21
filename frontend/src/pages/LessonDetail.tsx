import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { LessonType } from "../types/LessonType";
import { getLessonById } from "../utils/lessons";

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();
  const [lesson, setLesson] = useState<LessonType | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedLesson = await getLessonById(id);
        if (fetchedLesson) {
          setLesson(fetchedLesson);
        }
      } catch (err) {
        console.error("Error fetching lessons", err);
      }
    })();
  }, []);

  return (
    <div className="space-y-2">
      <div className="flex items-center space-x-4">
        <Link
          to="/lessons"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Informations de la leçon */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BookOpen size={24} className="text-indigo-600" />
            </div>
            <div>
              <div className="text-sm text-gray-500">
                {lesson?.categoryName} › {lesson?.subject}
              </div>
            </div>
          </div>

          <div className="prose max-w-none">
            <h2 className="text-xl font-semibold mb-4">Contenu de la leçon</h2>
            <p className="text-gray-600">{lesson?.content}</p>
          </div>
        </div>

        {/* Actions rapides */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
                Programmer un cours
              </button>
              <button className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                Modifier la leçon
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Annexes</h2>
            <div className="space-y-4">
              <div>
                <div className="text-md text-gray-500">liens:</div>
                {lesson?.linkUrl && (
                  <div className="text-sm font-semibold text-blue-500">
                    <a href={lesson.linkUrl} className="hover:underline">
                      {lesson.linkUrl}
                    </a>
                  </div>
                )}
              </div>
              <div>
                <div className="text-sm text-gray-500">fichiers: </div>
                {lesson?.filePath && (
                  <div className="text-2xl font-semibold text-gray-900">
                    {lesson.filePath}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
