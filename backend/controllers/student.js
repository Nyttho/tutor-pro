import Student from "../models/Student.js";

const createStudent = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const studentController = { createStudent };

export default studentController;
