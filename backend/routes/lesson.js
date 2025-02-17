import { Router } from "express";
import lessonController from "../controllers/lesson.js";
import isAuth from "../middlewares/isAuth.js";

const lessonRouter = Router();

lessonRouter.get("/", isAuth, lessonController.getAllLessons);
lessonRouter.get("/:id", isAuth, lessonController.getOneLesson);

export default lessonRouter;
