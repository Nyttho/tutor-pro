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

const createCourse = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const { student_id, lesson_id, scheduled_at, duration, price } = req.body;

    if (!student_id || !lesson_id || !scheduled_at) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const scheduledAt = new Date(scheduled_at);
    if (isNaN(scheduledAt.getTime())) {
      return res.status(400).json({ error: "Invalid date format" });
    }

    const courseDuration = duration ? parseInt(duration) : 60;

    // Vérification du chevauchement avec la méthode du modèle
    const isOverlapping = await Course.hasOverlap(
      userId,
      scheduledAt,
      courseDuration
    );
    if (isOverlapping) {
      return res
        .status(409)
        .json({ error: "Course time conflicts with another scheduled course" });
    }

    // Création du cours si pas de conflit
    const newCourse = await Course.create({
      student_id,
      professor_id: userId,
      lesson_id,
      scheduled_at: scheduledAt,
      duration: courseDuration,
      price,
      status: "pending",
    });

    return res.status(201).json(newCourse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const courseController = { getAllCourse, getOneCourse, createCourse };

export default courseController;
