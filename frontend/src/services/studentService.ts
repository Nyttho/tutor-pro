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