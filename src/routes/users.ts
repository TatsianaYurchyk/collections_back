import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();
router.get("/", requiresAuth, UserController.getAuthenticatedUser);
// router.get("/", UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login",UserController.logIn);
router.get("/get", UserController.getUsers);
router.delete("/:userId",UserController.deleteUser);
router.patch("/:userId", UserController.updateUserStatus);
router.patch("/togglerole/:userId", UserController.updateUserRole);
router.post("/logout", UserController.logOut);

export default router;