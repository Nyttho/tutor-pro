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

export const getCourses = async (month: number, year: number, day: number | null =null) => {
  try {
    let url = `${backendUrl}/api/course?year=${year}&month=${month}`;
    if(day) url += `&day=${day}`
    const response = await fetch(url, {
      credentials: "include",
    });
    const datas = await response.json();
    return datas;
  } catch (err) {
    console.error("Error fetching courses");
  }
};

export const getNextCourses = async (limit: number) => {
  try {
    const url = `${backendUrl}/api/course/next?limit=${limit}`
    const response = await fetch(url, {
      credentials: "include"
    })
    const datas = await response.json()
    return datas
  } catch(err) {

    console.error("Error fetching courses");
  }
}
