import { Router } from "express";
import categoryController from "../controllers/category.js";
import isAuth from "../middlewares/isAuth.js";

const categoryRouter = Router();

export default categoryRouter;
