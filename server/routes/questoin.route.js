import e from "express";
import { createQuestion, deleteQuestion } from "../controllers/question.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = e.Router();

router.post("/:slug", authMiddleware, upload.single("image"), createQuestion);
router.delete("/:slug", authMiddleware, deleteQuestion);

export default router;