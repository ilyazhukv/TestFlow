import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";

import dbConnect from "./config/db.js";
import authRouter from "./routes/auth.routes.js"
import categoryRouter from "./routes/category.routes.js"
import questionRouter from "./routes/questoin.route.js"
import testRouter from "./routes/test.routes.js"
import userRouter from "./routes/user.routes.js"

dotenv.config();
dbConnect();

const swaggerFile = fs.readFileSync("./swagger.yaml", "utf-8");
const swaggerDocument = yaml.parse(swaggerFile);

const app = e();

app.use(cors({ credentials: true, origin: [process.env.CLIENT_URL, process.env.DEV_CLIENT_URL] }));
app.use(e.json({limit: "10mb"}));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/question", questionRouter)
app.use("/test", testRouter);
app.use("/user", userRouter);

app.use("/uploads", e.static("uploads"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}/`);
});