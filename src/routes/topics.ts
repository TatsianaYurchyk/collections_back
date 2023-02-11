import express from "express";
import * as TopicController from "../controllers/topics";
import { requiresAuth } from "../middleware/auth";
import { requiresAdm } from "../middleware/authAdm";

const router = express.Router();
router.get("/", TopicController.getTopics);

export default router;