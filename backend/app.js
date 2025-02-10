import "dotenv/config";
import express from "express";
import userRouter from "./routes/user.js";

const app = express();

const PORT = process.env.PORT || 3000;

//parse req body
app.use(express.json());

app.use("/api/users", userRouter);

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
