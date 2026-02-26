import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

import dbConnect from "./config/db.js";
import authRouter from "./routes/auth.routes.js"

dotenv.config();
dbConnect();

const swaggerFile = fs.readFileSync("./swagger.yaml", "utf-8");
const swaggerDocument = yaml.parse(swaggerFile);

const app = e();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(e.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});