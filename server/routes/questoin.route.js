import e from "express";
import { createQuestion, deleteQuestion } from "../controllers/question.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const route = e.Router();

route.post("/:slug", authMiddleware, upload.single("image"), createQuestion);
route.delete("/:slug", authMiddleware, deleteQuestion);

export default route;