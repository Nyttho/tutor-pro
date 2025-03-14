import { useEffect, useState } from "react";
import { StudentWithCourseCountAndPayments } from "../types/StudentType";
import { getStudents } from "../utils/getStats"; // Assurez-vous que getStudents gère bien le calcul du nombre de cours et des paiements
import StudentCard from "../components/StudentCard";
import { Plus } from "lucide-react";

export default function Students() {
  const [students, setStudents] = useState<StudentWithCourseCountAndPayments[]>(
    []
  );
  const today = new Date();
  const currentMonth = today.getMonth() + 1; // Mois courant (1-12)
  const currentYear = today.getFullYear(); // Année actuelle

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupération des étudiants avec les calculs
        const studentsWithCourses = await getStudents();
        setStudents(studentsWithCourses);
      } catch (err) {
        console.error("Error fetching students", err);
      }
    };

    fetchData();
  }, [currentMonth, currentYear]);

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
          <p>Aucun élève disponible</p> // Afficher un message si aucun étudiant
        ) : (
          students.map((s) => <StudentCard student={s} key={s.id} />)
        )}
      </div>
    </div>
  );
}
