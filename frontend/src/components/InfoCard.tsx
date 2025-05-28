import { Mail, Phone, Home } from "lucide-react";
import { StudentWithCourseCountAndPayments } from "../types/StudentType";

interface InfoCardProps {
  student: StudentWithCourseCountAndPayments;
}
export default function InfoCard({ student }: InfoCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <h2 className="text-xl font-semibold mb-4">Informations de contact</h2>
      <div className="space-y-4">
        <div className="flex items-center text-gray-600">
          <Mail size={20} className="mr-3" />
          <a href={`mailto:${student.email}`} className="hover:text-indigo-600">
            {student.email}
          </a>
        </div>
        <div className="flex items-center text-gray-600">
          <Phone size={20} className="mr-3" />
          <a href={`tel:${student.tel}`} className="hover:text-indigo-600">
            {student.tel}
          </a>
        </div>
        <div className="flex items-center text-gray-600">
          <Home size={20} className="mr-3" />
          <a href={`tel:${student.tel}`} className="hover:text-indigo-600">
            {student.address} - {student.city.postCode} {student.city.name}
          </a>
        </div>
      </div>
    </div>
  );
}
