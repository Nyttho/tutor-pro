import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken } from "../utils/tokens.js";

const auth = async (req, res) => {
  try {
    const { email, password1 } = req.body;
    //check if user in bdd
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    //check password
    const isPasswordValid = await bcryptjs.compare(password1, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const accessToken = generateAccessToken(user);

    //cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "strict" : "lax",
      maxAge: 1000 * 60 * 15,
    });

    const { password, ...cleanedUser } = user;
    return res
      .status(200)
      .json({ message: "Authentication successfull", user: cleanedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const checkSession = async (req, res) => {
  try {
    const userId = req.user.id;  // depuis le JWT

    // Récupérer l'utilisateur complet en base
    const user = await User.getById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Préparer l'objet complet à envoyer
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      cityId: user.cityId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return res.status(200).json({ user: userData });
  } catch (err) {
    return res.status(401).json({ error: err.message });
  }
};

const authController = { auth, logout, checkSession };

export default authController;
