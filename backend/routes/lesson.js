import { Router } from "express";
import lessonController from "../controllers/lesson.js";
import isAuth from "../middlewares/isAuth.js";

const lessonRouter = Router();

lessonRouter.get("/", isAuth, lessonController.getAllLessons);

export default lessonRouter;
