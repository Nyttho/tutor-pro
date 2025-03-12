import { useEffect, useState } from "react";
import {
  StudentType,
  StudentWithCourseCountAndPayments,
} from "../types/StudentType";
import { CourseType } from "../types/CourseType";
import { getStudents, getCourses } from "../utils/getStats";
import StudentCard from "../components/StudentCard";
import { Plus } from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState<StudentWithCourseCountAndPayments[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stud: StudentType[] = await getStudents();
        const courses: CourseType[] = await getCourses();

        console.log("Students:", stud);
        console.log("Courses:", courses);

        const getStudentCourseCount = (studentId: number) => {
          return courses.filter(
            (course: CourseType) => course.studentId === studentId
          ).length;
        };

        const getStudentPendingPayments = (studentId: number) => {
          return courses.filter(
            (course: CourseType) =>
              course.studentId === studentId && course.status === "pending"
          ).length;
        };

        const studentsWithCourseCountAndPayments = stud.map(
          (student: StudentType) => {
            const courseCount = getStudentCourseCount(student.id);
            const pendingPayments = getStudentPendingPayments(student.id);
            return {
              ...student,
              courseCount,
              pendingPayments,
            };
          }
        );

        setStudents(studentsWithCourseCountAndPayments);
      } catch (err) {
        console.error("Error fetching students or courses", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Élèves</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus size={20} />
          Ajouter un élève
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.length === 0 ? (
          <p>No students available</p> // Afficher un message si aucun étudiant
        ) : (
          students.map((s) => <StudentCard student={s} key={s.id} />)
        )}
      </div>
    </div>
  );
}
