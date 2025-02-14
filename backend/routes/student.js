import { Router } from "express";
import studentController from "../controllers/student.js";
import isAuth from "../middlewares/isAuth.js";

const studentRouter = Router();

studentRouter.post("/", isAuth, studentController.createStudent);

export default studentRouter;
