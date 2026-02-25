import e from "express";
import cors from "cors"
import dotenv from "dotenv";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

import dbConnect from "./config/db.js";

dotenv.config();
dbConnect();

const swaggerFile = fs.readFileSync("./swagger.yaml", "utf-8");
const swaggerDocument = yaml.parse(swaggerFile);

const app = e();

app.use(cors());
app.use(e.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
})