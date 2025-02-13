import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import { generateAccessToken } from "../utils/tokens.js";

const auth = async (req, res) => {
  try {
    const { email, password } = req.body;

    //check if user in bdd
    const user = await User.getByEmail(email);
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    //check password
    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: "Invalid credentials" });
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

    const { passwordb, ...cleanedUser } = user;

    return res
      .status(200)
      .json({ message: "Authentication successfull", user: cleanedUser });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    });

    res.status(200).json({message: "Successfully logged out"})
  } catch (err) {
    res.status(500).json({error: err.message})
};
}

const authController = { auth, logout };

export default authController;
