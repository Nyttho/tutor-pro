import { Router } from "express";
import lessonController from "../controllers/lesson.js";
import isAuth from "../middlewares/isAuth.js";
import fileManager from "../middlewares/fileManager.js";

const lessonRouter = Router();

lessonRouter.get("/", isAuth, lessonController.getAllLessons);
lessonRouter.get("/:id", isAuth, lessonController.getOneLesson);
lessonRouter.post(
  "/",
  isAuth,
  fileManager.single("file"),
  lessonController.createLesson
);
lessonRouter.put(
  "/:id",
  isAuth,
  fileManager.single("file"),
  lessonController.updateLesson
);
lessonRouter.delete("/:id", isAuth, lessonController.deleteLesson);

export default lessonRouter;
