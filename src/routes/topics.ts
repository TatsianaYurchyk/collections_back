import express from "express";
import * as TopicController from "../controllers/topics";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();
router.get("/", TopicController.getTopics);

export default router;