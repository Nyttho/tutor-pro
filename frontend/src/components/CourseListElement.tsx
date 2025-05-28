import { CourseType } from "../types/CourseType";
import { toggleCourseStatus } from "../services/courseService";
import { useState } from "react";

interface CourseListElementProps {
  course: CourseType;
  onStatusChange?: () => void;
}
export default function CourseListElement({ course, onStatusChange }: CourseListElementProps) {
  const [status, setStatus] = useState(course.status);

  const handleToggle = async () => {
    try {
      const updated = await toggleCourseStatus(course.id);
      setStatus(updated.status);
      if (onStatusChange) onStatusChange();
    } catch (err) {
      console.error("Failed update status", err);
    }
  };
  return (
    <div
      key={course.id}
      className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
    >
      <div>
        <p className="font-medium text-gray-900">
          {course?.studentName} {course?.studentSurname}
        </p>
        <p className="text-sm text-gray-600">
          {new Date(course.scheduledAt).toLocaleString("fr-FR", {
            dateStyle: "long",
            timeStyle: "short",
          })}
        </p>
      </div>
      <span
        onClick={handleToggle}
        className={`px-3 py-1 rounded-full text-sm cursor-pointer hover:scale-105 transition ${
          status === "paid"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {status === "paid" ? "Payé" : "Non payé"}
      </span>
    </div>
  );
}
