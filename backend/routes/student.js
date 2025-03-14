import { Router } from "express";
import studentController from "../controllers/student.js";
import isAuth from "../middlewares/isAuth.js";

const studentRouter = Router();

studentRouter.get("/", isAuth, studentController.getAllStudents);
studentRouter.get("/:id", isAuth, studentController.getOneStudent);
studentRouter.post("/", isAuth, studentController.createStudent);
studentRouter.put("/:id", isAuth, studentController.updateStudent);
studentRouter.delete("/:id", isAuth, studentController.deleteStudent);

export default studentRouter;
