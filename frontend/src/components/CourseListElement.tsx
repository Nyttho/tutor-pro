import { CourseType } from "../types/CourseType"
interface CourseListElementProps {
    course: CourseType
}
export default function CourseListElement({course}: CourseListElementProps){
    return (
     
             <div
                key={course.id}
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
              >
                <div>
                  <p className="font-medium text-gray-900">
                    {course?.studentName} {course?.studentSurname}
                  </p>
                  <p className="text-sm text-gray-600">
                    {new Date(course.scheduledAt).toLocaleString("fr-FR", {
                      dateStyle: "long",
                      timeStyle: "short",
                    })}
                  </p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    course.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {course.status === "paid" ? "Payé" : "Non payé"}
                </span>
              </div>
       
    )
}