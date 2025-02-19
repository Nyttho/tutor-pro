import Course from "../models/Course.js";

const getAllCourse = (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const courseController = { getAllCourse };

export default courseController;
