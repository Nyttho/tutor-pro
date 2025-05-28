import { StudentType } from "../types/StudentType";

const backendUrl = import.meta.env.VITE_BACKEND;

export const getStudents = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/student`, {
      credentials: "include",
    });
    const datas = await response.json();
    return datas.filter((student: StudentType) => student?.isActive);
  } catch (err) {
    console.error("Error fetching students");
  }
};

export const getStudentById = async (id: string | undefined) => {
  try {
    const response = await fetch(`${backendUrl}/api/student/${id}`, {
      credentials: "include",
    });
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error("Error fetching student");
  }
};

export async function createStudent(data: any) {
  const response = await fetch(`${backendUrl}/api/student`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include", 
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Erreur lors de la création de l'élève");
  }

  return response.json(); 
}
