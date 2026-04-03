import e from "express";
import { createTest, deleteTest, getMyTest, getTest, getTests, updateTest } from "../controllers/test.controller.js"
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js"

const router = e.Router();

router.post("/create", authMiddleware, upload.single("image"), createTest);
router.get("/my/:slug", authMiddleware, getMyTest);
router.get("/:slug", getTest);
router.get("/", getTests);
router.put("/:slug", authMiddleware, upload.single("image"), updateTest);
router.delete("/:slug", authMiddleware, deleteTest);

export default router;