import e from "express";
import { getUser, getUserByName } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = e.Router();

router.get("/:name", authMiddleware, getUserByName);
router.get("/", authMiddleware, getUser);

export default router;