import File from "../models/File.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
export const registerFile = async (req, path) => {
  try {
    let filePath = path.join(
      "/lessons_files",
      req.body.category.trim(),
      req.body.subject.trim(),
      req.body.lessonName.trim(),
      req.file.filename
    );

    filePath = filePath.replace(/\\/g, "/");

    const newFile = await File.create({
      file_url: filePath,
      file_type: req.file.mimetype,
      size: req.file.size,
    });

    return newFile;
  } catch (err) {
    console.error(err.message);
  }
};

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const FILE_STORAGE_DIR = path.join(__dirname, "../lessons_files");

export const deleteFile = async (fileId) => {
  try {
    const file = await File.getById(fileId);

    if (file) {
      const filePath = file.file_url;

      if (!filePath) {
        console.error("File path is undefined");
        return;
      }

      const cleanFilePath = filePath.replace(/^\/lessons_files/, "");

      const completeFilePath = path.join(FILE_STORAGE_DIR, cleanFilePath);

      if (fs.existsSync(completeFilePath)) {
        await fs.promises.unlink(completeFilePath);
      } else {
        console.error(`File not found at ${completeFilePath}`);
      }
    } else {
      console.log("File not found");
    }
  } catch (err) {
    console.error("Failed to delete file:", err);
  }
};
