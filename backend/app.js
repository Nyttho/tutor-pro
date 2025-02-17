import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
//------------ URL and path ------------------
import { fileURLToPath } from "url";
import path from "path";
import { dirname } from "path";
//--------------swagger---------------------
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swaggerDef.js";
//--------------routers--------------------
import userRouter from "./routes/user.js";
import authRouter from "./routes/auth.js";
import categoryRouter from "./routes/category.js";
import subjectRouter from "./routes/subject.js";
import studentRouter from "./routes/student.js";
import lessonRouter from "./routes/lesson.js";

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//parse req body
app.use(express.json());

// get path from directory where is current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static files folder
app.use(
  "/lessons_files",
  express.static(path.join(__dirname, "lessons_files"))
);

app.use(cookieParser());

//----------routes--------------------------
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/subject", subjectRouter);
app.use("/api/student", studentRouter);
app.use("/api/lesson", lessonRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
