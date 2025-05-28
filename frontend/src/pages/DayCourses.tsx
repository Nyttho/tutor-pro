import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../services/courseService";
import { CourseType } from "../types/CourseType";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CourseListElement from "../components/CourseListElement";
const DayCourses = () => {
  const [searchParams] = useSearchParams();
  const [courses, setCourses] = useState<CourseType[]>([]);

  const year = Number(searchParams.get("year"));
  const month = Number(searchParams.get("month")) + 1;
  const day = Number(searchParams.get("day"));

  useEffect(() => {
    (async () => {
      try {
        const fetchedCourses = await getCourses(month, year, day);
        setCourses(fetchedCourses);
      } catch (err) {
        console.error("Error fetching courses", err);
      }
    })();
  }, [year, month, day]);

  return (
    <div>
      <div className="flex items-center space-x-4 mb-4">
        <Link
          to="/calendar"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour au calendrier
        </Link>
      </div>
      <ul className="space-y-2">
        {courses.map((course) => (
          <li key={course.id} >
            <CourseListElement course={course} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DayCourses;
