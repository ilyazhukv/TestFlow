import express from "express";
import { createTest, getTest, getTests, deleteTest } from "../controllers/test.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/create", authMiddleware, createTest);
router.get("/:id", authMiddleware, getTest);
router.get("/", getTests);
router.delete("/delete", authMiddleware, deleteTest)

export default router;