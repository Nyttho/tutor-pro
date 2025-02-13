import { Router } from "express";
import subjectController from "../controllers/subject.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const subjectRouter = Router();

export default subjectRouter;
