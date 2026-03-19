import e from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import checkRole from "../middlewares/role.middleware.js";

const router = e.Router();

router.post("/", authMiddleware, checkRole(["admin"]), createCategory);
router.get("/", getCategories);

export default router;