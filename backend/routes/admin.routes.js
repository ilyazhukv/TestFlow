import express from "express";
import { updateUserRole } from "../controllers/admin.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import requireRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.put("/users/role", authMiddleware, requireRoles(["admin"]), updateUserRole);

export default router;