import { Router } from "express";
import { authMiddleware } from "@middlewares/auth.middleware";
import { changePassword, forgotPassword, resetPassword } from "./password.controller";

const router = Router();

/**
 * @swagger
 * /api/password/change-password:
 *   patch:
 *     tags:
 *       - Password
 *     summary: Change password for logged-in user
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 example: OldP@ssw0rd
 *               newPassword:
 *                 type: string
 *                 example: NewStr0ngP@ssw0rd
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized or invalid current password
 *       404:
 *         description: User not found
 */
router.patch("/change-password", authMiddleware, changePassword);

/**
 * @swagger
 * /api/password/forgot-password:
 *   post:
 *     tags:
 *       - Password
 *     summary: Request password reset link
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: johndoe@example.com
 *     responses:
 *       200:
 *         description: Password reset link sent to your email
 *       400:
 *         description: Password reset link already sent
 *       401:
 *         description: Email not verified
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", forgotPassword);

/**
 * @swagger
 * /api/password/reset-password/{token}:
 *   patch:
 *     tags:
 *       - Password
 *     summary: Reset password using a valid reset token
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Reset password token (from email)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: NewStr0ngP@ssw0rd
 *     responses:
 *       200:
 *         description: Password has been reset successfully
 *       400:
 *         description: Invalid or expired token
 */
router.patch("/reset-password/:token", resetPassword);

export default router;
