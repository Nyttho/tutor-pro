import { Router } from "express";
import studentController from "../controllers/student.js";
import isAuth from "../middlewares/isAuth.js";

const studentRouter = Router();

/**
 * @swagger
 * tags:
 *   - name: Student
 *     description: Operations related to students
 */

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new student
 *     description: This endpoint creates a new student in the database.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: First name of the student.
 *               surname:
 *                 type: string
 *                 description: Surname of the student.
 *               address:
 *                 type: string
 *                 description: Address of the student.
 *               city:
 *                 type: string
 *                 description: City where the student lives.
 *               postCode:
 *                 type: string
 *                 description: Postal code of the city.
 *               country:
 *                 type: string
 *                 description: Country where the student lives.
 *               email:
 *                 type: string
 *                 description: Email address of the student.
 *               tel:
 *                 type: string
 *                 description: Phone number of the student.
 *               age:
 *                 type: integer
 *                 description: Age of the student.
 *             required:
 *               - name
 *               - surname
 *               - address
 *               - city
 *               - postCode
 *               - country
 *               - age
 *     responses:
 *       201:
 *         description: Student created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Student Created Successfully
 *                 student:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier for the student
 *                     name:
 *                       type: string
 *                       description: First name of the student
 *                     surname:
 *                       type: string
 *                       description: Surname of the student
 *                     address:
 *                       type: string
 *                       description: Address of the student
 *                     city_id:
 *                       type: integer
 *                       description: ID of the city
 *                     is_active:
 *                       type: boolean
 *                       description: Whether the student is active
 *                     created_by:
 *                       type: integer
 *                       description: ID of the user who created the student
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Date and time the student was created
 *                     email:
 *                       type: string
 *                       description: Email of the student
 *                     tel:
 *                       type: string
 *                       description: Phone number of the student
 *                     age:
 *                       type: integer
 *                       description: Age of the student
 *       400:
 *         description: Bad Request. Some required fields are missing or invalid.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Those fields are required : name, surname, address"
 *       409:
 *         description: Conflict. The student already exists in the system.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student already exists"
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */


studentRouter.get("/", isAuth, studentController.getAllStudents);
studentRouter.post("/", isAuth, studentController.createStudent);

export default studentRouter;
