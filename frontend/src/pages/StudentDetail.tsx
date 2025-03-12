import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getStudentById, getCourses } from "../utils/getStats";
import { useEffect, useState } from "react";
import {
  StudentType,
  StudentWithCourseCountAndPayments,
} from "../types/StudentType";
import { CourseType } from "../types/CourseType";
import InfoCard from "../components/InfoCard";
import StatCard from "../components/StatCard";
import FastActionCard from "../components/FastActionCard";

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] =
    useState<StudentWithCourseCountAndPayments | null>(null);
  const [courses, setCourses] = useState<CourseType[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const stud: StudentType = await getStudentById(id);
        const allCourses: CourseType[] = await getCourses(); // Récupérer tous les cours

        // Filtrer les cours pour cet étudiant
        const studentCourses = allCourses.filter(
          (course) => course.studentId === stud.id
        );

        // Calculer le nombre de cours et le nombre de paiements en attente pour l'étudiant
        const courseCount = studentCourses.length;
        const pendingPayments = studentCourses.filter(
          (course) => course.status === "pending"
        ).length;

        // Créer un objet avec les informations de l'étudiant et de ses cours
        const studentWithDetails: StudentWithCourseCountAndPayments = {
          ...stud,
          courseCount,
          pendingPayments,
        };

        // Mettre à jour l'état de l'étudiant
        setStudent(studentWithDetails);
        setCourses(studentCourses); // Mettre à jour l'état des cours pour cet étudiant
      } catch (err) {
        console.error("Error fetching student or courses", err);
      }
    })();
  }, [id]); // Ajout de id comme dépendance pour mettre à jour quand l'ID change

  if (!student) {
    return <div>Élève non trouvé</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center space-x-4">
        <Link
          to="/students"
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={20} className="mr-2" />
          Retour
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">
          {student.name} {student.surname}
        </h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <InfoCard student={student} />
        <StatCard courses={courses} />
        <FastActionCard />
      </div>
    </div>
  );
}
