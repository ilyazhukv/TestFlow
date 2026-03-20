import e from "express";
import { createTest, getTest, getTests, updateTest } from "../controllers/test.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"

const router = e.Router();

router.post("/create", authMiddleware, upload.single("image"), createTest);
router.get("/:id", getTest)
router.get("/", getTests);
router.put("/:id", authMiddleware, upload.single("image"), updateTest);

export default router;