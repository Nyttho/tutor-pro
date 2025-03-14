import { Router } from "express";
import userController from "../controllers/user.js";
import isAuth from "../middlewares/isAuth.js";

const userRouter = Router();

userRouter.get("/", userController.getAllUsers);
userRouter.get("/:id", userController.getOneUser);
userRouter.post("/", userController.createUser);
userRouter.put("/:id", isAuth, userController.updateUser)
userRouter.delete("/:id", isAuth, userController.deleteUser)

export default userRouter;
