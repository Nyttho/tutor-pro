import { Router } from "express";
import courseController from "../controllers/courses.js";
import isAuth from "../middlewares/isAuth.js";

const courseRouter = Router();

courseRouter.get("/", isAuth, courseController.getAllCourse);
courseRouter.get("/:id", isAuth, courseController.getOneCourse);
courseRouter.post("/", isAuth, courseController.createCourse);

export default courseRouter;
