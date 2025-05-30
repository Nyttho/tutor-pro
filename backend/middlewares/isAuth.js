import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/tokens.js";

const JWT_SECRET = process.env.JWT_SECRET;
const isAuth = (req, res, next) => {
  const token = req.cookies.accessToken;
  // If no token is found in cookies, deny access
  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }
  // Verify the token using the secret key
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired access token" });
    }
    // Attach the verified user to the request object
    req.user = user;

    const newToken = generateAccessToken(user);

    // Set the new token as an HTTP-only cookie
    res.cookie("accessToken", newToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
      maxAge: 15 * 60 * 1000,
    });
    // Proceed to the next middleware or route handler
    next();
  });
};

export default isAuth;
