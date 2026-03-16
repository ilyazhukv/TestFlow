import e from "express";
import {getTests} from "../controllers/test.controller.js"

const router = e.Router();

router.get("/", getTests);

export default router;