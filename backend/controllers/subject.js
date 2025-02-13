import Subject from "../models/Subject.js";

const getAllSubjects = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const subjectController = { getAllSubjects };

export default subjectController;
