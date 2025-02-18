import { Router } from "express";
import lessonController from "../controllers/lesson.js";
import isAuth from "../middlewares/isAuth.js";
import fileManager from "../middlewares/fileManager.js";

const lessonRouter = Router();

/**
 * @swagger
 * /lessons:
 *   get:
 *     summary: Retrieve all lessons created by the authenticated user
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of lessons created by the user
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 3
 *                   name:
 *                     type: string
 *                     example: "List of irregular verbs"
 *                   content:
 *                     type: string
 *                     example: "Description of the lesson"
 *                   subject_id:
 *                     type: integer
 *                     example: 1
 *                   user_id:
 *                     type: integer
 *                     example: 2
 *                   created_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2025-02-17T14:26:53.637Z"
 *                   created_by:
 *                     type: integer
 *                     example: 2
 *                   file_id:
 *                     type: integer
 *                     nullable: true
 *                     example: 2
 *                   link_id:
 *                     type: integer
 *                     nullable: true
 *                     example: 5
 *       404:
 *         description: No lessons found for this user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No lessons found for this user"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

/**
 * @swagger
 * /lessons/{id}:
 *   get:
 *     summary: Retrieve a specific lesson created by the authenticated user
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lesson to retrieve
 *         schema:
 *           type: integer
 *           example: 3
 *     responses:
 *       200:
 *         description: The requested lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 3
 *                 name:
 *                   type: string
 *                   example: "List of irregular verbs"
 *                 content:
 *                   type: string
 *                   example: "Description of the lesson"
 *                 subject_id:
 *                   type: integer
 *                   example: 1
 *                 user_id:
 *                   type: integer
 *                   example: 2
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   example: "2025-02-17T14:26:53.637Z"
 *                 created_by:
 *                   type: integer
 *                   example: 2
 *                 file_id:
 *                   type: integer
 *                   nullable: true
 *                   example: 2
 *                 link_id:
 *                   type: integer
 *                   nullable: true
 *                   example: 5
 *       403:
 *         description: Unauthorized access to this lesson
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Lesson not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Lesson not found"
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */

lessonRouter.get("/", isAuth, lessonController.getAllLessons);
lessonRouter.get("/:id", isAuth, lessonController.getOneLesson);
lessonRouter.post(
  "/",
  isAuth,
  fileManager.single("file"),
  lessonController.createLesson
);

export default lessonRouter;
