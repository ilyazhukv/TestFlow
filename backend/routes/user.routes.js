import express from "express";
import { registerUser, loginUser, getUsers, deleteUser } from "../controllers/user.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import requireRoles from "../middleware/role.middleware.js";
import validator from "../middleware/validator.middleware.js";

const router = express.Router();

router.post("/register", validator({email: true, password: 4}), registerUser);
router.post("/login", loginUser);
router.get("/", authMiddleware, requireRoles(["admin"]), getUsers);
router.delete("/delete", authMiddleware, deleteUser);

export default router;