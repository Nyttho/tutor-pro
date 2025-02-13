import { Router } from "express";
import categoryController from "../controllers/category.js";
import isAuth from "../middlewares/isAuth.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);

export default categoryRouter;
