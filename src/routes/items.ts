import express from "express";
import * as ItemsController from "../controllers/items";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/:collectionId", ItemsController.getItems);

// router.get("/:collectionId", CollectionsController.getCollection);

router.post("/create",requiresAuth, ItemsController.createItem);

// router.patch("/:collectionId", ItemsController.updateItem);

router.delete("/:itemId", requiresAuth, ItemsController.deleteItem);

export default router;