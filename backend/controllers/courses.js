import Course from "../models/Course.js";

const getAllCourse = async (req, res) => {
  try {
    const professorId = parseInt(req.params.id);
    if (isNaN(professorId)) {
      return res.status(400).json({ error: "Invalid professor ID" });
    }

    const { year, month, week, day } = req.query;

    const courses = await Course.getAllByProfessor(professorId, {
      year,
      month,
      week,
      day,
    });

    if (courses.length === 0) {
      return res.status(404).json({ error: "No courses found" });
    }

    return res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const courseController = { getAllCourse };

export default courseController;
