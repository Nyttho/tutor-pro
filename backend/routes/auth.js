import { Router } from "express";
import authController from "../controllers/auth.js";
import isAuth from "../middlewares/isAuth.js"

const authRouter = Router();

authRouter.post("/login", authController.auth);
authRouter.post("/logout",isAuth, authController.logout )

export default authRouter;
