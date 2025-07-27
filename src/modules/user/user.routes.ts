import { Router } from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import { updateUser, deleteUser } from "./user.controller";

const router = Router();

router.patch("/update/:userId", authMiddleware, updateUser);
router.delete("/delete/:userId", authMiddleware, deleteUser);

export default router;