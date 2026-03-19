import e from "express";
import { createTest, getTests } from "../controllers/test.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"

const router = e.Router();

router.post("/create", authMiddleware, upload.single("image"), createTest);
router.get("/", getTests);

export default router;