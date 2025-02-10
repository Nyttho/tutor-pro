import { Router } from "express";
import userController from "../controllers/user.js";

const userRouter = Router();

userRouter.post("/", userController.createUser);

export default userRouter;
