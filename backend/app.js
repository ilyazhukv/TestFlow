import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express"

import DBConnect from "./config/db.js";
import adminRoutes from "./routes/admin.routes.js"
import resultRoutes from "./routes/result.routes.js"
import testRoutes from "./routes/test.routes.js"
import userRoutes from "./routes/user.routes.js"

dotenv.config();
DBConnect();

const file = fs.readFileSync("./swagger.yaml", "utf-8");
const swaggerDocument = yaml.parse(file);

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admin", adminRoutes);
app.use("/result", resultRoutes)
app.use("/test", testRoutes);
app.use("/user", userRoutes);

app.use('/uploads', express.static('uploads'));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});