import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

// Définition de __dirname pour ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration de Multer pour stocker les fichiers dans "lessons_files"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const { category, subject, lessonName } = req.body;
    const uploadPath = path.join(
      __dirname,
      "../lessons_files",
      category.trim(),
      subject.trim(),
      lessonName.trim()
    );

    fs.mkdirSync(uploadPath, { recursive: true }); // Crée le dossier s'il n'existe pas
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

// Middleware pour l'upload
const upload = multer({ storage });

export default upload;
