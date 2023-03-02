import express from "express";
import * as UserController from "../controllers/users";
import { requiresAuth } from "../middleware/auth";

const router = express.Router();
router.get("/", requiresAuth, UserController.getAuthenticatedUser);
// router.get("/get", requiresAuth,requiresAdm , UserController.getAuthenticatedUser);
router.post("/signup", UserController.signUp);
router.post("/login",UserController.logIn);
router.get("/admin/get", UserController.getUsers);
router.delete("/admin/:userId",UserController.deleteUser);
router.patch("/admin/:userId", UserController.updateUserStatus);
router.patch("/admin/togglerole/:userId", UserController.updateUserRole);
router.post("/logout", UserController.logOut);

export default router;