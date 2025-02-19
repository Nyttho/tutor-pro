import Course from "../models/Course.js";

const getAllCourse = async (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid professor ID" });
    }

    const { year, month, week, day } = req.query;

    const courses = await Course.getAllByProfessor(userId, {
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

const getOneCourse = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const courseId = parseInt(req.params.id);

    if (isNaN(userId) || isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid user ID or course ID" });
    }

    const course = await Course.getById(courseId);

    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    if (course.professor_id !== userId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to access this course" });
    }

    return res.status(200).json(course);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const courseController = { getAllCourse, getOneCourse };

export default courseController;
