export interface StudentType {
    id: number;
    name: string;
    surname: string;
    address: string;
    cityId: number;
    createdBy: number;
    isActive: boolean;
    email: string | null;
    tel: string | null;
    age: number;
    isDeleted: boolean;
}

export interface StudentWithCourseCountAndPayments extends StudentType {
    courseCount: number;
    pendingPayments: number; // Nombre de paiements en attente
}