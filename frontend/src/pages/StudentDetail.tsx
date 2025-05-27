import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { getStudentById } from "../services/studentService";
import { useEffect, useState } from "react";
import { StudentWithCourseCountAndPayments } from "../types/StudentType";
import InfoCard from "../components/InfoCard";
import StatCard from "../components/StatCard";
import FastActionCard from "../components/FastActionCard";

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] =
    useState<StudentWithCourseCountAndPayments | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const stud: StudentWithCourseCountAndPayments = await getStudentById(
          id
        );
        setStudent(stud);
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
        <StatCard
          coursesCount={student.totalCourses}
          coursesPending={student.pendingCourses}
        />
        <FastActionCard />
      </div>
    </div>
  );
}
