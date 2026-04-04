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

app.set("trust proxy", 1);

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(e.json({ limit: "10mb" }));
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/category", categoryRouter);
app.use("/question", questionRouter);
app.use("/result", resultRouter);
app.use("/test", testRouter);
app.use("/user", userRouter);

app.use("/uploads", e.static("uploads"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on port ${PORT}`);
});