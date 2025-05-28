import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getCourses } from "../services/courseService";
import { CourseType } from "../types/CourseType";

const CourseDetail = () => {
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
      <h2>Course Details</h2>
      {courses.map((course, index) => (
        <div key={index}>
          <p>Nom étudiant : {course.studentName}</p>
          <p>Prix : {course.price} €</p>
        </div>
      ))}
    </div>
  );
};

export default CourseDetail;
