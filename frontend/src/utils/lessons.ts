const backendUrl = import.meta.env.VITE_BACKEND;
export const getLessons = async () => {
  try {
    const response = await fetch(`${backendUrl}/api/lesson`, {
      credentials: "include",
    });
    const lessons = await response.json();
    return lessons;
  } catch (err) {
    console.error("Error fetching lessons", err);
  }
};
