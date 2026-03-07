import e from "express";
import { getUser } from "../controllers/user.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = e.Router();

router.get("/", authMiddleware, getUser);

export default router;