import express from "express";
import * as CollectionsController from "../controllers/collections";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

//router.get("/", requiresAuth, CollectionsController.getCollections);
router.get("/", CollectionsController.getCollections);

router.get("/all", CollectionsController.getCollectionsHomePage);

router.get("/:collectionId", CollectionsController.getCollection);

router.post("/create", requiresAuth, CollectionsController.createCollection);

router.patch("/:collectionId", CollectionsController.updateCollection);

router.delete("/:collectionId", requiresAuth, CollectionsController.deleteCollection);

export default router;