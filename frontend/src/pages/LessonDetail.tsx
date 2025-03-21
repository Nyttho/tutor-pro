import { useParams, Link } from "react-router-dom";
import { ArrowLeft, BookOpen, Users } from "lucide-react";

export default function LessonDetail() {
  const { id } = useParams<{ id: string }>();

  return <h1>lessondetail</h1>;
}
