import { useState, useEffect } from "react";
import { getStudents } from "../services/studentService";
import { StudentWithCourseCountAndPayments } from "../types/StudentType";
import StudentCard from "../components/StudentCard";
import { Plus } from "lucide-react";
import Modal from "../components/ui/Modal";
import StudentForm from "../components/forms/StudentForm"; // à créer ensuite

export default function Students() {
  const [students, setStudents] = useState<StudentWithCourseCountAndPayments[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Élèves</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus size={20} />
          Ajouter un élève
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {students.length === 0 ? (
          <p>Aucun élève disponible</p>
        ) : (
          students.map((s) => <StudentCard student={s} key={s.id} />)
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
