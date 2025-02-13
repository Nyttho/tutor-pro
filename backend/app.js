import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cookieParser from "cookie-parser";
import { swaggerOptions } from "./config/swaggerDef.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//parse req body
app.use(express.json());

app.use(cookieParser());

app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
