import express from "express";
import * as ItemsController from "../controllers/items";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();

router.get("/:collectionId",requiresAuth, ItemsController.getItems);

// router.get("/:collectionId", CollectionsController.getCollection);

router.post("/create",requiresAuth, ItemsController.createItem);

// router.patch("/:collectionId", ItemsController.updateItem);

router.delete("/:itemId",  ItemsController.deleteItem);

export default router;