export interface Course {
    id: number;
    studentId: number;
    professorId: number;
    lessonId: number;
    scheduledAt: Date;
    price: number;
    status: "paid" | "pending";
    duration: number;
}