import e from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import dbConnect from "./config/db.js";
import logger from "./config/logger.js";
import Sentry from "./config/sentry.js";

import authRouter from "./routes/auth.routes.js";
import categoryRouter from "./routes/category.routes.js";
import questionRouter from "./routes/questoin.route.js";
import resultRouter from "./routes/result.routes.js";
import testRouter from "./routes/test.routes.js";
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";

dotenv.config();
dbConnect();

const app = e();

app.set("trust proxy", 1);

app.use(Sentry.Handlers.requestHandler());
app.use(require('response-time')(function (req, res, time) {
  logger.info(`${req.method} ${req.originalUrl} ${time}ms`);
}));

app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(e.json({ limit: "10mb" }));
app.use(cookieParser());
app.use(helmet());

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: { server: ["Too many requests from this IP, please try again later"] } },
  standardHeaders: true,
  legacyHeaders: false,
});

app.use("/auth", authLimiter, authRouter);
app.use("/category", categoryRouter);
app.use("/question", questionRouter);
app.use("/result", resultRouter);
app.use("/test", testRouter);
app.use("/user", userRouter);
app.use("/admin", adminRouter);

app.use(Sentry.Handlers.errorHandler());

import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";

const PORT = process.env.PORT || 5000;

const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  logger.info(`Socket connected: ${socket.id}`);

  socket.on("joinTest", (testId) => {
    socket.join(testId);
    logger.info(`Socket ${socket.id} joined test ${testId}`);
  });

  socket.on("testProgress", (data) => {
    // Broadcast progress to other users in the same test
    socket.to(data.testId).emit("updateProgress", data);
  });

  socket.on("disconnect", () => {
    logger.info(`Socket disconnected: ${socket.id}`);
  });
});

httpServer.listen(PORT, '0.0.0.0', () => {
  logger.info(`Server started on port ${PORT}`);
});
