export interface LessonType {
  id: number;
  name: string;
  content: string;
  subject: string;
  userId: number;
  createdAt: string;
  createdBy: number;
  fileId: number | null;
  linkId: number | null;
}
