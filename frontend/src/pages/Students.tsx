import { useState, useEffect } from "react";
import { getStudents } from "../services/studentService";
import { StudentWithCourseCountAndPayments } from "../types/StudentType";
import StudentCard from "../components/StudentCard";
import { Plus, Filter } from "lucide-react";
import Modal from "../components/ui/Modal";
import StudentForm from "../components/forms/StudentForm";

export default function Students() {
  const [students, setStudents] = useState<StudentWithCourseCountAndPayments[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterLatePayments, setFilterLatePayments] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

const filteredAndSortedStudents = students
  .filter((student) => {
    if (!filterLatePayments) return true;
    return Number(student.pendingCourses) > 0;
  })
  .sort((a, b) => a.name.localeCompare(b.name));



  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Élèves</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setFilterLatePayments((prev) => !prev)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer ${
              filterLatePayments
                ? "bg-red-100 text-red-700 border-red-300"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-red-50`}
          >
            <Filter size={18} />
            {filterLatePayments ? "Paiements en retard" : "Tous les élèves"}
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 cursor-pointer"
          >
            <Plus size={20} />
            Ajouter un élève
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedStudents.length === 0 ? (
          <p>Aucun élève disponible</p>
        ) : (
          filteredAndSortedStudents.map((s) => <StudentCard student={s} key={s.id} />)
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Ajouter un élève"
      >
        <StudentForm
          onSuccess={() => {
            setIsModalOpen(false);
            fetchStudents(); // refresh list
          }}
        />
      </Modal>
    </div>
  );
}
