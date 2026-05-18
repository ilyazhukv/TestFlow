import e from "express";
import { getUser, getUserByName, updateUser, changePassword, deleteUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = e.Router();

router.get("/:name", authMiddleware, getUserByName);
router.get("/", authMiddleware, getUser);
router.put("/", authMiddleware, upload.single("avatar"), updateUser);
router.put("/password", authMiddleware, changePassword);
router.delete("/", authMiddleware, deleteUser);

export default router;