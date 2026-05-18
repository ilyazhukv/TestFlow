import e from "express";
import { createCategory, getCategories } from "../controllers/category.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import checkRole from "../middlewares/role.middleware.js";
import { cache, cacheResponse } from "../middlewares/cache.middleware.js";

const router = e.Router();

router.post("/", authMiddleware, checkRole(["admin"]), createCategory);
router.get("/", cache("categories"), getCategories, cacheResponse);

export default router;
