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

/**
 * @swagger
 * /lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Grammar"
 *               subject:
 *                 type: string
 *                 example: "English"
 *               lessonName:
 *                 type: string
 *                 example: "List of irregular verbs"
 *               content:
 *                 type: string
 *                 example: "A detailed lesson on irregular verbs."
 *               link:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/lesson-resource"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Optional file upload"
 *     responses:
 *       201:
 *         description: Lesson created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lesson created successfully"
 *                 lesson:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 10
 *                     name:
 *                       type: string
 *                       example: "List of irregular verbs"
 *                     content:
 *                       type: string
 *                       example: "A detailed lesson on irregular verbs."
 *                     subject_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 2
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-17T14:26:53.637Z"
 *                     created_by:
 *                       type: integer
 *                       example: 2
 *                     file_id:
 *                       type: integer
 *                       nullable: true
 *                       example: 5
 *                     link_id:
 *                       type: integer
 *                       nullable: true
 *                       example: 7
 *       400:
 *         description: Missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Category, subject, and lesson name are required"
 *       404:
 *         description: Category or subject not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Category not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

/**
 * @swagger
 * /lessons/{id}:
 *   put:
 *     summary: Update an existing lesson
 *     tags:
 *       - Lessons
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the lesson to update
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 example: "Grammar"
 *               subject:
 *                 type: string
 *                 example: "English"
 *               lessonName:
 *                 type: string
 *                 example: "List of irregular verbs"
 *               content:
 *                 type: string
 *                 example: "Updated description for the lesson on irregular verbs."
 *               link:
 *                 type: string
 *                 nullable: true
 *                 example: "https://new-resource.com"
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: "Optional file upload"
 *     responses:
 *       200:
 *         description: Lesson updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Lesson updated successfully"
 *                 lesson:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "List of irregular verbs"
 *                     content:
 *                       type: string
 *                       example: "Updated description for the lesson on irregular verbs."
 *                     subject_id:
 *                       type: integer
 *                       example: 1
 *                     user_id:
 *                       type: integer
 *                       example: 2
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-17T14:26:53.637Z"
 *                     created_by:
 *                       type: integer
 *                       example: 2
 *                     file_id:
 *                       type: integer
 *                       nullable: true
 *                       example: 3
 *                     link_id:
 *                       type: integer
 *                       nullable: true
 *                       example: 4
 *       400:
 *         description: Missing required fields or invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Category, subject, and lesson name are required"
 *       403:
 *         description: Unauthorized access (user does not own the lesson)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized access"
 *       404:
 *         description: Lesson, category, or subject not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Lesson not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */

lessonRouter.get("/", isAuth, lessonController.getAllLessons);
lessonRouter.get("/:id", isAuth, lessonController.getOneLesson);
lessonRouter.post(
  "/",
  isAuth,
  fileManager.single("file"),
  lessonController.createLesson
);
lessonRouter.put(
  "/:id",
  isAuth,
  fileManager.single("file"),
  lessonController.updateLesson
);

export default lessonRouter;
