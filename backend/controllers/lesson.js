import Lesson from "../models/Lesson.js";

const getAllLessons = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);

    const lessons = await Lesson.getAll().filter(
      (l) => l.created_by === userId
    );

    if (lessons.length === 0) {
      return res.status(404).json({ error: "Lessons not found" });
    }
    return res.status(200).json(lessons);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const lessonController = { getAllLessons };

export default lessonController;
