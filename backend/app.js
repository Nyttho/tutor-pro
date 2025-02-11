import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swaggerDef.js";

const app = express();

const PORT = process.env.PORT || 3000;

const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

//parse req body
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
