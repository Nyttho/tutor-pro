import { Router } from "express";
import studentController from "../controllers/student.js";
import isAuth from "../middlewares/isAuth.js";

const studentRouter = Router();

/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Retrieve all students of the authenticated user
 *     description: This endpoint retrieves all students created by the authenticated user. It will also check if any student has been inactive for more than 6 months based on the last course they attended. If so, the student will be marked as inactive.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 students:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier for the student
 *                       name:
 *                         type: string
 *                         description: First name of the student
 *                       surname:
 *                         type: string
 *                         description: Surname of the student
 *                       address:
 *                         type: string
 *                         description: Address of the student
 *                       city_id:
 *                         type: integer
 *                         description: ID of the city
 *                       is_active:
 *                         type: boolean
 *                         description: Whether the student is active or not
 *                       created_by:
 *                         type: integer
 *                         description: ID of the user who created the student
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Date and time the student was created
 *                       email:
 *                         type: string
 *                         description: Email of the student
 *                       tel:
 *                         type: string
 *                         description: Phone number of the student
 *                       age:
 *                         type: integer
 *                         description: Age of the student
 *       404:
 *         description: No students found for the authenticated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Students not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

/**
 * @swagger
 * /api/student/{id}:
 *   get:
 *     summary: Retrieve a specific student by ID
 *     description: This endpoint retrieves a student by their ID. The user can only access students they created.
 *     tags: [Student]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   description: Unique identifier for the student
 *                 name:
 *                   type: string
 *                   description: First name of the student
 *                 surname:
 *                   type: string
 *                   description: Surname of the student
 *                 address:
 *                   type: string
 *                   description: Address of the student
 *                 city_id:
 *                   type: integer
 *                   description: ID of the city
 *                 is_active:
 *                   type: boolean
 *                   description: Whether the student is active or not
 *                 created_by:
 *                   type: integer
 *                   description: ID of the user who created the student
 *                 created_at:
 *                   type: string
 *                   format: date-time
 *                   description: Date and time the student was created
 *                 email:
 *                   type: string
 *                   description: Email of the student
 *                 tel:
 *                   type: string
 *                   description: Phone number of the student
 *                 age:
 *                   type: integer
 *                   description: Age of the student
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
 *       403:
 *         description: Forbidden. User is not allowed to access this student.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not allowed to access this student"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An unexpected error occurred."
 */

/**
 * @swagger
 * /api/student:
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

/**
 * @swagger
 * /api/student/{id}:
 *   put:
 *     summary: Update a student's information
 *     description: Update an existing student's details. Only the creator of the student can perform this action.
 *     tags: 
 *       - Student
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The ID of the student to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "John"
 *               surname:
 *                 type: string
 *                 example: "Doe"
 *               address:
 *                 type: string
 *                 example: "123 Main St"
 *               city:
 *                 type: string
 *                 example: "Paris"
 *               postCode:
 *                 type: string
 *                 example: "75000"
 *               country:
 *                 type: string
 *                 example: "France"
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "johndoe@example.com"
 *               tel:
 *                 type: string
 *                 example: "+33612345678"
 *               age:
 *                 type: integer
 *                 example: 25
 *     responses:
 *       200:
 *         description: Student updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Student updated successfully"
 *                 student:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John"
 *                     surname:
 *                       type: string
 *                       example: "Doe"
 *                     address:
 *                       type: string
 *                       example: "123 Main St"
 *                     city_id:
 *                       type: integer
 *                       example: 5
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "johndoe@example.com"
 *                     tel:
 *                       type: string
 *                       example: "+33612345678"
 *                     age:
 *                       type: integer
 *                       example: 25
 *       400:
 *         description: Invalid input or missing required fields
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please enter valid information"
 *       403:
 *         description: Forbidden - User is not allowed to update this student
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "You are not allowed to update this student"
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Student not found"
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
 * /api/student/{id}:
 *   delete:
 *     summary: Delete a student (soft delete)
 *     description: Marks a student as deleted by setting `is_deleted` to `true`. Only the student creator can delete them.
 *     tags:
 *       - Student
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID of the student to delete
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *         content:
 *           application/json:
 *             example:
 *               message: "Student deleted successfully"
 *       400:
 *         description: Student is already deleted
 *         content:
 *           application/json:
 *             example:
 *               error: "Student is already deleted"
 *       403:
 *         description: User not allowed to delete this student
 *         content:
 *           application/json:
 *             example:
 *               error: "You are not allowed to delete this student"
 *       404:
 *         description: Student not found
 *         content:
 *           application/json:
 *             example:
 *               error: "Student not found"
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             example:
 *               error: "Failed to delete student"
 */

studentRouter.get("/", isAuth, studentController.getAllStudents);
studentRouter.get("/:id", isAuth, studentController.getOneStudent);
studentRouter.post("/", isAuth, studentController.createStudent);
studentRouter.put("/:id", isAuth, studentController.updateStudent);
studentRouter.delete("/:id", isAuth, studentController.deleteStudent);

export default studentRouter;
