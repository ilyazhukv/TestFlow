import express from "express";
import { registerUser, loginUser, getUsers } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import requireRoles from "../middleware/role.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, requireRoles(["admin"]), getUsers)

export default router;