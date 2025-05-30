export interface User {
    id: number;
    name: string;
    email: string;
    isAdmin?: boolean;
    cityId: number;
    createdAt: string;
    updatedAt: string;
  }