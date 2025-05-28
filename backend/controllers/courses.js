import Course from "../models/Course.js";

const getAllCourse = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
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
      return res.status(200).json([]);
    }

    return res.status(200).json(courses);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
};

const getNextCourses = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    if (isNaN(userId)) {
      return res.status(400).json({ error: "Invalid professor ID" });
    }
    const { limit } = req.query;

    const courses = await Course.getNextCourses(userId, limit);

    if (courses.length === 0) {
      return res.status(200).json([]);
    }

    return res.status(200).json(courses);
  } catch (err) {
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

    if (course.professorId !== userId) {
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

    const { studentId, lessonId, scheduled, duration, price } = req.body;

    if (!studentId || !lessonId || !scheduled) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const scheduledAt = new Date(scheduled);
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
      studentId,
      professorId: userId,
      lessonId,
      scheduledAt: scheduledAt,
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

const updateCourse = async (req, res) => {
  try {
    const userId = parseInt(req.user.id);
    const courseId = parseInt(req.params.id);

    if (isNaN(userId) || isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid user ID or course ID" });
    }

    // Récupérer le cours existant
    const course = await Course.getById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Vérifier que c'est bien le professeur qui modifie son cours
    if (course.professorId !== userId) {
      return res
        .status(403)
        .json({ error: "You are not allowed to modify this course" });
    }

    // Extraire les champs modifiables dans le body
    const { studentId, lessonId, scheduled, duration, price, status } =
      req.body;

    // Si date prévue, vérifier sa validité et préparer la date
    let scheduledAt = course.scheduledAt;
    if (scheduled) {
      const newDate = new Date(scheduled);
      if (isNaN(newDate.getTime())) {
        return res.status(400).json({ error: "Invalid date format" });
      }
      scheduledAt = newDate;
    }

    // Durée à utiliser
    const courseDuration = duration ? parseInt(duration) : course.duration;

    // Vérifier le chevauchement en excluant ce cours (on modifie, donc on peut ignorer ce cours là)
    const isOverlapping = await Course.hasOverlapExcludingCourse(
      userId,
      scheduledAt,
      courseDuration,
      courseId
    );

    if (isOverlapping) {
      return res
        .status(409)
        .json({ error: "Course time conflicts with another scheduled course" });
    }

    // Construire l'objet à mettre à jour (seulement les champs fournis)
    const updatedFields = {};
    if (studentId !== undefined) updatedFields.studentId = studentId;
    if (lessonId !== undefined) updatedFields.lessonId = lessonId;
    if (scheduled) updatedFields.scheduledAt = scheduledAt;
    if (duration !== undefined) updatedFields.duration = courseDuration;
    if (price !== undefined) updatedFields.price = price;
    if (status !== undefined) updatedFields.status = status;

    // Mise à jour via la méthode du modèle (à créer si besoin)
    const updatedCourse = await Course.update(courseId, updatedFields);

    return res.status(200).json(updatedCourse);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const toggleCourseStatus = async (req, res) => {
  try {
    const courseId = parseInt(req.params.id);
    if (isNaN(courseId)) {
      return res.status(400).json({ error: "Invalid course ID" });
    }

    const course = await Course.getById(courseId);
    if (!course) {
      return res.status(404).json({ error: "Course not found" });
    }

    // Changement du status (exemple simple)
    const newStatus = course.status === "paid" ? "pending" : "paid";

    const updatedCourse = await Course.update(courseId, { status: newStatus });

    return res.status(200).json(updatedCourse);
  } catch (err) {
    console.error(err.message); // juste le message
    return res.status(500).json({ error: "Internal server error" });
  }
};


const courseController = {
  getAllCourse,
  getOneCourse,
  createCourse,
  getNextCourses,
  updateCourse,
  toggleCourseStatus,
};

export default courseController;
