/**
 * @swagger
 * /api/student:
 *   get:
 *     summary: Retrieve all students of the authenticated user
 *     description: This endpoint retrieves all students created by the authenticated user. It will also check if any student has been inactive for more than 6 months based on the last course they attended. If so, the student will be marked as inactive.
 *     tags: [Students]
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
 *                     $ref: '#/components/schemas/Student'
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
 *     tags: [Students]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the student to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Student'
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
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique identifier for the student
 *         name:
 *           type: string
 *           description: First name of the student
 *         surname:
 *           type: string
 *           description: Surname of the student
 *         address:
 *           type: string
 *           description: Address of the student
 *         cityId:
 *           type: integer
 *           description: ID of the city
 *         createdBy:
 *           type: integer
 *           description: ID of the user who created the student
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date and time the student was created
 *         isActive:
 *           type: boolean
 *           description: Whether the student is active or not
 *         email:
 *           type: string
 *           format: email
 *           description: Email of the student
 *         tel:
 *           type: string
 *           description: Phone number of the student
 *         age:
 *           type: integer
 *           description: Age of the student
 *         isDeleted:
 *           type: boolean
 *           description: Indicates if the student is deleted
 *         totalCourses:
 *           type: integer
 *           description: Total number of courses taken by the student
 *         pendingCourses:
 *           type: integer
 *           description: Number of pending courses for the student
 */

