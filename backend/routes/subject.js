import { Router } from "express";
import subjectController from "../controllers/subject.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const subjectRouter = Router();

subjectRouter.get("/", subjectController.getAllSubjects);
subjectRouter.get("/:id", subjectController.getOneSubject);
subjectRouter.post("/", isAuth, isAdmin, subjectController.createSubject);
subjectRouter.put("/:id", isAuth, isAdmin, subjectController.updateSubject);
subjectRouter.delete("/:id", isAuth, isAdmin, subjectController.deleteSubject);

export default subjectRouter;
