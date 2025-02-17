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

const getOneLesson = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const lessonId = parseInt(req.params.id);

    const lesson = await Lesson.getById(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    if (lesson.created_by !== userId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to access this lesson" });
    }
    return res.status(200).json({ lesson });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLesson = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const { name, content, subject, link, file } = req.body;

    if (!name || !subject) {
      return res
        .status(400)
        .json({ error: "Both 'name' and 'subject' are required" });
    }

    if (!(content || link || file)) {
      return res.status(400).json({
        error: "At least one of 'content', 'link', or 'file' is required",
      });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const lessonController = { getAllLessons, getOneLesson, createLesson };

export default lessonController;
