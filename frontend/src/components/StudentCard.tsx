import { Link } from "react-router-dom";
import { StudentWithCourseCountAndPayments } from "../types/StudentType";
import { Mail, Phone } from "lucide-react";

interface StudentCardProps {
  student: StudentWithCourseCountAndPayments;
}

export default function StudentCard({ student }: StudentCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
      <Link to={`/student/${student.id}`}>
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">
              {student.name} {student.surname}
            </h3>
            <div className="mt-2 space-y-1">
              <div className="flex items-center text-gray-600">
                <Mail size={16} className="mr-2" />
                <span className="hover:text-indigo-600">{student.email}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={16} className="mr-2" />
                <span className="hover:text-indigo-600">{student.tel}</span>
              </div>
            </div>
          </div>
          <button
            onClick={(e) => {
              e.preventDefault();
              
            }}
            className="text-gray-400 hover:text-gray-600"
          >
            •••
          </button>
        </div>
        <div className="mt-6 pt-6 border-t border-gray-100">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-gray-500">Total des cours</div>
              <div className="mt-1 text-xl font-semibold text-gray-900">
                {student.courseCount}
              </div>
            </div>
            <div>
              <div className="text-gray-500">Paiements en attente</div>
              <div className="mt-1 text-xl font-semibold text-red-600">
                {student.pendingPayments}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
