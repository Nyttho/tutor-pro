import File from "../models/File.js";
const registerFile = async (req, path) => {
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
};

export default registerFile;
