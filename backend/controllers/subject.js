import Subject from "../models/Subject.js";

const getAllSubjects = async (req, res) => {
  try {
    const subjects = await Subject.getAll();

    if (subjects.length === 0) {
      return res.status(404).json({ error: "No subject found" });
    }

    return res.status(200).json(subjects);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getOneSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const subject = await Subject.getById(subjectId);

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    return res.status(200).json({ subject });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const subjectController = { getAllSubjects, getOneSubject };

export default subjectController;
