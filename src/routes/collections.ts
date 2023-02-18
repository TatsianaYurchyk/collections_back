import express from "express";
import * as CollectionsController from "../controllers/collections";

const router = express.Router();

router.get("/", CollectionsController.getCollections);

router.get("/:collectionId", CollectionsController.getCollection);

router.post("/create", CollectionsController.createCollection);

// router.patch("/:noteId", CollectionsController.updateCollection);

// router.delete("/:noteId", CollectionsController.deleteCollection);

export default router;