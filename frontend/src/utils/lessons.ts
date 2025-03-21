const backendUrl = import.meta.env.VITE_BACKEND;
import { LessonType } from "../types/LessonType";

export const getLessons = async (): Promise<LessonType[]> => {
  try {
    const response = await fetch(`${backendUrl}/api/lesson`, {
      credentials: "include",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch lessons: ${response.status}`);
    }

    const lessons: LessonType[] = await response.json();
    return lessons;
  } catch (err) {
    console.error("Error fetching lessons", err);
    throw new Error("Unable to fetch lessons");
  }
};

export const getLessonById = async (
  id: string | undefined
): Promise<LessonType> => {
  try {
    const response = await fetch(`${backendUrl}/api/lesson/${id}`, {
      credentials: "include",
    });
    const lesson: LessonType = await response.json();
    return lesson;
  } catch (err) {
    console.error("Error fetching lesson", err);
    throw new Error("Unable to fetch lessons");
  }
};
