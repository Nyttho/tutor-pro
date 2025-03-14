export interface CourseType {
    id: number;
    studentId: number;
    professorId: number;
    lessonId: number;
    scheduledAt: Date;
    price: number;
    status: "paid" | "pending";
    duration: number;
    studentName: string;
    studentSurname: String;
}