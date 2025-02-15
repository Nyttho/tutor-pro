import { Router } from "express";
import authController from "../controllers/auth.js";
import isAuth from "../middlewares/isAuth.js"

const authRouter = Router();
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: Authenticate a user
 *     description: Authenticates a user using their email and password. Returns an access token stored in a cookie and the user details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "test@example.com"
 *                 description: The user's email address.
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "mypassword123"
 *                 description: The user's password.
 *     responses:
 *       200:
 *         description: Authentication successful. The access token is set in the cookies.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Authentication successful"
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "John Doe"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "test@example.com"
 *                     is_admin:
 *                       type: boolean
 *                       example: false
 *                     city_id:
 *                       type: integer
 *                       example: 1swaggerdoc
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       example: "2025-02-10T17:00:56.529Z"
 *       400:
 *         description: Invalid credentials (wrong email or password).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Invalid credentials"
 *       500:
 *         description: Internal server error.
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
 * /api/auth/logout:
 *   post:
 *     summary: Log out the user
 *     description: Clears the authentication cookie to log the user out.
 *     tags:
 *       - Authentication
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Successfully logged out
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Successfully logged out
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


authRouter.post("/login", authController.auth);
authRouter.post("/logout",isAuth, authController.logout )

export default authRouter;
