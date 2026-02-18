import express from "express";
import { saveResult, getResult, getResults, deleteResult } from "../controllers/result.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import requireRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/save", authMiddleware, saveResult);
router.get("/user/:id", authMiddleware, getResult);
router.get("/", getResults);
router.delete("/delete", authMiddleware, deleteResult)

export default router;