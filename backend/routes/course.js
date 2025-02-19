import { Router } from "express";
import courseController from "../controllers/courses.js";
import isAuth from "../middlewares/isAuth.js";

const courseRouter = Router();

courseRouter.get("/", isAuth, courseController.getAllCourse);

export default courseRouter;
