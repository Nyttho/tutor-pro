import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const ACCESS_JWT_EXPIRATION = "1h";

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, admin: user.isAdmin },
    JWT_SECRET,
    {
      expiresIn: ACCESS_JWT_EXPIRATION,
    }
  );
};
