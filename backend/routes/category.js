import { Router } from "express";
import categoryController from "../controllers/category.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoryRouter = Router();

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getOneCategory);
categoryRouter.post("/", isAuth, isAdmin, categoryController.createCategory);
categoryRouter.put("/:id", isAuth, isAdmin, categoryController.updateCategory);

export default categoryRouter;
