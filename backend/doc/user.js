/**
 * @swagger
 * /api/users:
 *   get:
 *     tags:
 *       - Users
 *     summary: Get all users
 *     description: Retrieves the list of all users. The authentication token is expected in the cookies under the name 'token'.
 *     responses:
 *       200:
 *         description: Users successfully retrieved.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         description: Unique identifier of the user.
 *                       name:
 *                         type: string
 *                         description: Full name of the user.
 *                       email:
 *                         type: string
 *                         format: email
 *                         description: Email address of the user.
 *                       is_admin:
 *                         type: boolean
 *                         description: Indicates whether the user is an administrator.
 *                       city_id:
 *                         type: integer
 *                         description: Identifier of the user's city.
 *                       created_at:
 *                         type: string
 *                         format: date-time
 *                         description: Timestamp of when the user was created.
 *       401:
 *         description: Unauthorized. Missing or invalid authentication token.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - Users
 *     summary: Retrieve a specific user
 *     description: Retrieves a specific user based on their ID. The authentication token is expected in the cookies under the name 'token'.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User successfully found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       description: Unique identifier of the user.
 *                     name:
 *                       type: string
 *                       description: Full name of the user.
 *                     email:
 *                       type: string
 *                       format: email
 *                       description: Email address of the user.
 *                     is_admin:
 *                       type: boolean
 *                       description: Indicates whether the user is an administrator.
 *                     city_id:
 *                       type: integer
 *                       description: Identifier of the user's city.
 *                     created_at:
 *                       type: string
 *                       format: date-time
 *                       description: Timestamp of when the user was created.
 *       400:
 *         description: Invalid user ID format.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Internal server error.
 */

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
 *       422:
 *         description: Unprocessable Entity - City does not match postal code
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: City does not match postal code
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

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update a user
 *     description: Update a user's information. Only the user himself or an admin can update user details.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: New name of the user
 *                 example: John Doe
 *               email:
 *                 type: string
 *                 format: email
 *                 description: New email of the user
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 description: New password of the user
 *                 example: MyStrongPass123!
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User updated successfully
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
 *         description: Invalid request data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Invalid request data
 *       403:
 *         description: Unauthorized action (user is not allowed to update this user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: You are not authorized to update this user
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not found
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

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete a user
 *     description: Delete a user account. A user can only delete their own account.
 *     tags:
 *       - Users
 *     security:
 *       - cookieAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user deleted successfully
 *       400:
 *         description: Invalid request (user does not exist)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Invalid request
 *       403:
 *         description: Unauthorized action (user is not allowed to delete another user)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: You're not authorized to delete this user
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