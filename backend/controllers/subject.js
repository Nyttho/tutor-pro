import Subject from "../models/Subject.js";
import Category from "../models/Category.js";

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

const createSubject = async (req, res) => {
  try {
    const { name, category } = req.body;
    const user = req.user;

    if (!name || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    let categoryDb = await Category.getByName(category);

    //create category if it doesn't exist yet
    if (!categoryDb) {
      categoryDb = await Category.create({ name: category })
    }

    const isSubjectAlreadyExists = await Subject.getByName(name);

    if (isSubjectAlreadyExists) {
      return res.status(409).json({ error: "Subject already exists" });
    }

    const subjectFields = {
      name,
      categoryId: categoryDb.id,
      createdBy: user.id,
    };

    const newSubject = await Subject.create(subjectFields);

    res
      .status(201)
      .json({ message: "Subject Successfully Created", subject: newSubject });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const updateSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;
    const { name, category } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const subject = await Subject.getById(subjectId);
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    let categoryDb = await Category.getByName(category);
    if (!categoryDb) {
      categoryDb = await Category.create({ name: category });
    }

    const updatedSubject = await Subject.update(subjectId, {
      name,
      categoryId: categoryDb.id,
    });

    if (!updatedSubject) {
      return res.status(500).json({ error: "Failed to update subject" });
    }

    return res
      .status(200)
      .json({
        message: "Subject updated successfully",
        subject: updatedSubject,
      });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const deleteSubject = async (req, res) => {
  try {
    const subjectId = req.params.id;

    const subject = await Subject.getById(subjectId);

    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    await Subject.delete(subjectId);

    return res.status(200).json({ message: "Subject deleted successfully" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const subjectController = {
  getAllSubjects,
  getOneSubject,
  createSubject,
  updateSubject,
  deleteSubject,
};

export default subjectController;
