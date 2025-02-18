import Lesson from "../models/Lesson.js";
import Category from "../models/Category.js";
import Subject from "../models/Subject.js";
import Link from "../models/Link.js";
import path from "path";
import { registerFile, deleteFile } from "../utils/fileManager.js";

const getAllLessons = async (req, res) => {
  try {
    const userId = parseInt(req.user.id, 10);

    // Récupération des leçons créées par l'utilisateur
    const lessons = await Lesson.getAll();
    const userLessons = lessons.filter(
      (lesson) => lesson.created_by === userId
    );

    if (userLessons.length === 0) {
      return res.status(404).json({ error: "No lessons found for this user" });
    }

    return res.status(200).json(userLessons);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const getOneLesson = async (req, res) => {
  try {
    const userId = parseInt(req.user.id, 10);
    const lessonId = parseInt(req.params.id, 10);

    const lesson = await Lesson.getById(lessonId);

    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    if (lesson.created_by !== userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    return res.status(200).json({ lesson });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createLesson = async (req, res) => {
  try {
    // Récupération des données
    const { category, subject, lessonName, content, link } = req.body;
    const userId = parseInt(req.user.id, 10);

    // Vérification des champs obligatoires
    if (!category?.trim() || !subject?.trim() || !lessonName?.trim()) {
      return res
        .status(400)
        .json({ error: "Category, subject, and lesson name are required" });
    }

    // Vérification des catégories et matières
    const [categoryDb, subjectDb] = await Promise.all([
      Category.getByName(category.trim()),
      Subject.getByName(subject.trim()),
    ]);

    if (!categoryDb)
      return res.status(404).json({ error: "Category not found" });
    if (!subjectDb) return res.status(404).json({ error: "Subject not found" });

    const newLesson = {
      user_id: userId,
      subject_id: subjectDb.id,
      name: lessonName.trim(),
      content: content || "",
      created_at: new Date(),
      created_by: userId,
    };

    if (req.file) {
      const newFile = await registerFile(req, path);

      newLesson.file_id = newFile.id;
    }

    if (link?.trim()) {
      const newLink = await Link.create({ link: link.trim() });
      newLesson.link_id = newLink.id;
    }

    const lesson = await Lesson.create(newLesson);

    return res
      .status(201)
      .json({ message: "Lesson created successfully", lesson });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const updateLesson = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);
    const { category, subject, lessonName, content, link } = req.body;

    // Vérifier si la leçon existe
    const existingLesson = await Lesson.getById(lessonId);
    if (!existingLesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    // Vérifier si l'utilisateur est le propriétaire de la leçon
    if (existingLesson.created_by !== userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Vérification des champs obligatoires
    if (category?.trim() || subject?.trim() || lessonName?.trim()) {
      const [categoryDb, subjectDb] = await Promise.all([
        category
          ? Category.getByName(category.trim())
          : existingLesson.category,
        subject ? Subject.getByName(subject.trim()) : existingLesson.subject,
      ]);

      if (category && !categoryDb)
        return res.status(404).json({ error: "Category not found" });
      if (subject && !subjectDb)
        return res.status(404).json({ error: "Subject not found" });

      existingLesson.subject_id = subjectDb
        ? subjectDb.id
        : existingLesson.subject_id;
    }

    // Mise à jour des données de la leçon
    existingLesson.name = lessonName ? lessonName.trim() : existingLesson.name;
    existingLesson.content = content || existingLesson.content;

    // Gestion du fichier s'il est mis à jour
    if (req.file) {
      const newFile = await registerFile(req, path);
      existingLesson.file_id = newFile.id;
    }

    // Gestion du lien s'il est mis à jour
    if (link?.trim()) {
      const newLink = await Link.create({ link: link.trim() });
      existingLesson.link_id = newLink.id;
    }

    // Enregistrement des modifications
    const updatedLesson = await Lesson.update(lessonId, existingLesson);

    return res
      .status(200)
      .json({ message: "Lesson updated successfully", lesson: updatedLesson });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteLesson = async (req, res) => {
  try {
    const lessonId = parseInt(req.params.id, 10);
    const userId = parseInt(req.user.id, 10);

    // Vérifier si la leçon existe
    const lesson = await Lesson.getById(lessonId);
    if (!lesson) {
      return res.status(404).json({ error: "Lesson not found" });
    }

    // Vérifier si l'utilisateur est le propriétaire de la leçon
    if (lesson.created_by !== userId) {
      return res.status(403).json({ error: "Unauthorized access" });
    }

    // Supprimer le fichier si la leçon a un fichier associé
    if (lesson.file_id) {
      await deleteFile(lesson.file_id); // Appeler la fonction deleteFile
    }

    // Supprimer la leçon de la base de données
    await Lesson.delete(lessonId);

    return res
      .status(200)
      .json({ message: "Lesson and associated file deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const lessonController = {
  getAllLessons,
  getOneLesson,
  createLesson,
  updateLesson,
  deleteLesson,
};

export default lessonController;
