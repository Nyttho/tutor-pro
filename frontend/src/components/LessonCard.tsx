import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { LessonType } from "../types/LessonType";

interface LessonCardProps {
  lesson: LessonType;
}

export default function LessonCard({ lesson }: LessonCardProps) {
  return (
    <Link
      key={lesson.id}
      to={`/lessons/${lesson.id}`}
      className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow"
    >
      <div className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <BookOpen size={24} className="text-indigo-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {lesson.subject} - {lesson.name}
              </h3>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              // Add menu logic here
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            •••
          </button>
        </div>
      </div>
      <div className="px-6 py-4 bg-gray-50 flex justify-between items-center">
        <span className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
          Modifier
        </span>
        <span className="text-sm text-gray-600 hover:text-gray-700 font-medium">
          Voir le détail
        </span>
      </div>
    </Link>
  );
}
