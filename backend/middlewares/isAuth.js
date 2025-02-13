import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/tokens";

const JWT_SECRET = process.env.JWT_SECRET;
const isAuth = (req, res, next) => {
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ error: "Access token is missing" });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid or expired access token" });
    }
    req.user = user;
  });

  const newToken = generateAccessToken(user);

  res.cookie("accessToken", newToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 15 * 60 * 1000,
  });

  next();
};
