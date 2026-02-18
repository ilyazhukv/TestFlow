import express from "express";
import { saveResult, getResult } from "../controllers/result.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import requireRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("save", authMiddleware, requireRoles(["user", "admin"]), saveResult);
router.get("/", getResult);

export default router;