import "dotenv/config";
import express from "express";

const app = express();

const PORT = process.env.PORT || 3000;

//parse req body
app.use(express.json());

app.listen(PORT, () => {
  console.log("listening on port", PORT);
});
