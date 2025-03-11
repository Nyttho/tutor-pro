import "dotenv/config";
import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors"
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
import courseRouter from "./routes/course.js";

const app = express();

app.use(
  cors({
    origin: "http://localhost:5174", // Frontend (ou 5173)
    credentials: true, // allows cookies
  })
);

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(bodyParser.urlencoded({ extended: true }));
//parse req body
app.use(express.json());

// get path from directory where is current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// static pdf folder
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
app.use("/api/course", courseRouter);

export default app;
