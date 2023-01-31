import express from "express";
import * as UserController from "../controllers/users";

const router = express.Router();

router.get("/", UserController.getUsers);

export default router;