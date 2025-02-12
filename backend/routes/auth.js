import { Router } from "express";
import authController from "../controllers/auth.js";

const authRouter = Router();

authRouter.post("/login", authController.auth);

export default authRouter;
