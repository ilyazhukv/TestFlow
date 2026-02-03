import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import DBConnect from "./config/db.js";

dotenv.config();
DBConnect();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5555;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});