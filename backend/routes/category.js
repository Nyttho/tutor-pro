import { Router } from "express";
import categoryController from "../controllers/category.js";
import isAuth from "../middlewares/isAuth.js";
import isAdmin from "../middlewares/isAdmin.js";

const categoryRouter = Router();


/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Retrieve all categories
 *     description: Fetches a list of all available categories.
 *     tags:
 *       - Categories
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Mathematics"
 *       404:
 *         description: No category found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: No category found
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

categoryRouter.get("/", categoryController.getAllCategories);
categoryRouter.get("/:id", categoryController.getOneCategory);
categoryRouter.post("/", isAuth, isAdmin, categoryController.createCategory);
categoryRouter.put("/:id", isAuth, isAdmin, categoryController.updateCategory);
categoryRouter.delete("/:id", isAuth, isAdmin, categoryController.deleteCategory);

export default categoryRouter;
