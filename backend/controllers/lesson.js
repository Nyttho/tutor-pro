import Lesson from "../models/Lesson.js";

const getAllLessons = (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const lessonController = { getAllLessons };

export default lessonController;
