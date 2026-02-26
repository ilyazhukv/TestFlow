import e from "express";
import { register, login, logout, refresh } from "../controllers/auth.controller.js";

const router = e.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout)
router.get("/refresh", refresh);

export default router;