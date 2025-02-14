import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
//--------------swagger---------------------
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swaggerDef.js";
//--------------routers--------------------
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import subjectRouter from "./routes/subject.js";

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//parse req body
app.use(express.json());

app.use(cookieParser());

//----------routes--------------------------
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subject", subjectRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
