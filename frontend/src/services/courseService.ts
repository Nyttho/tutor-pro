const backendUrl = import.meta.env.VITE_BACKEND;

export const getCourses = async (month: number, year: number, day: number | null =null) => {
  try {
    let url = `${backendUrl}/api/course?year=${year}&month=${month}`;
    
    if(day) url += `&day=${day}`
    const response = await fetch(url, {
      credentials: "include",
    });
    console.log(url);
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

export const toggleCourseStatus = async (courseId: number) => {
  const url = `${backendUrl}/api/course/${courseId}/status`;
  const response = await fetch(url, {
    method: "PATCH",
    credentials: "include",
  });
  if (!response.ok) throw new Error("Failed to toggle status");
  return response.json();
};

