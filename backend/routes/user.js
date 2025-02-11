import { Router } from "express";
import userController from "../controllers/user.js";

const userRouter = Router();

/**
 * @swagger
 * /api/users/:
 *   post:
 *     summary: Create a new user
 *     description: Register a new user with the provided details.
 *     tags:
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - countryName
 *               - cityName
 *               - postCode
 *             properties:
 *               name:
 *                 type: string
 *                 description: The user's full name.
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 description: The user's email address.
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: P@ssw0rd!
 *               countryName:
 *                 type: string
 *                 description: The name of the user's country.
 *                 example: France
 *               cityName:
 *                 type: string
 *                 description: The name of the user's city.
 *                 example: Paris
 *               postCode:
 *                 type: string
 *                 description: The postal code of the user's city.
 *                 example: 75001
 *     responses:
 *       201:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: John Doe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     is_admin:
 *                       type: boolean
 *                       example: false
 *                     city_id:
 *                       type: integer
 *                       example: 101
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-02-11T17:55:24Z
 *       400:
 *         description: Bad Request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: All fields are required
 *       409:
 *         description: Conflict - User already exists
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User already exists
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal server error
 */

userRouter.post("/", userController.createUser);

export default userRouter;
