import e from "express";
import { getResults, getMyResults, saveResult, calcResult } from "../controllers/result.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = e.Router();

router.get("/", getResults);
router.get("/my", authMiddleware, getMyResults);
router.post("/:slug/save", authMiddleware, saveResult);
router.post("/:slug/calc", calcResult);

export default router;