import e from "express";
import {
  getUsers,
  updateUserRole,
  deleteUserByAdmin,
  getAllTests,
  createCategory,
  updateCategory,
  deleteCategory,
  getDashboardStats,
} from "../controllers/admin.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/role.middleware.js";

const router = e.Router();

router.use(authMiddleware, adminMiddleware);

router.get("/stats", getDashboardStats);

router.get("/users", getUsers);
router.put("/users/:id", updateUserRole);
router.delete("/users/:id", deleteUserByAdmin);

router.get("/tests", getAllTests);

router.post("/categories", createCategory);
router.put("/categories/:id", updateCategory);
router.delete("/categories/:id", deleteCategory);

export default router;