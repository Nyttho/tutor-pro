import { CourseType } from "../types/CourseType";
interface CalendarDayProps {
  className: string;
  day: number;
  courses: CourseType[]
}

const formatTime = (dateString: Date) => {
  const date = new Date(dateString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

export default function CalendarDay({ className, day, courses }: CalendarDayProps) {
  return <div className={className}>
   <div>{day}</div>
  <div className="space-y-2 ">
     {courses.map(course => (
      <div key={course.id} className="text-sm mx-3 bg-gray-300 py-1 px-2 rounded-xl">{formatTime(course.scheduledAt)} - {course.studentName} {course.studentSurname}</div>
     ))}
  </div>
    </div>;
}
