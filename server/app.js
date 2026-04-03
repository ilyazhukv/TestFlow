import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import dbConnect from "./config/db.js";
import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import questionRouter from "./routes/questoin.route.js";
import resultRouter from "./routes/result.routes.js";
import testRouter from "./routes/test.routes.js";
import userRouter from "./routes/user.routes.js";

dotenv.config();
dbConnect();

const app = e();

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(e.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/api/auth", authRouter);
app.use("/api/category", categoryRouter);
app.use("/api/question", questionRouter);
app.use("/api/result", resultRouter);
app.use("/api/test", testRouter);
app.use("/api/user", userRouter);

app.use("/api/uploads", e.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});