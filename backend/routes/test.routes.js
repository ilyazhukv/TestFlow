import express from "express";
import { createTest, submitTest, getTests} from "../controllers/test.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import requireRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/", authMiddleware, requireRoles(["user", "admin"]), createTest);
router.post("/:id/submit", submitTest);
router.get("/", getTests);

export default router;