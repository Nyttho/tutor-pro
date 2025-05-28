export interface StudentType {
  id: number;
  name: string;
  surname: string;
  address: string;
  city: {
    country: string;
    name: string;
    postCode: string;
  };
  postCode: string;
  createdBy: number;
  isActive: boolean;
  email: string | null;
  tel: string | null;
  age: number;
  isDeleted: boolean;
}

export interface StudentWithCourseCountAndPayments extends StudentType {
  totalCourses: number;
  pendingCourses: number; // Nombre de paiements en attente
}
