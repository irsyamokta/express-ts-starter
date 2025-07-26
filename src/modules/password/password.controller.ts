import { Request, Response, NextFunction } from "express";
import authService from "./password.service";

export const changePassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = (req as any).userId;
        const result = await authService.changePassword(userId, currentPassword, newPassword);
        res.json({ message: "Password changed successfully" });
    } catch (err) {
        next(err);
    }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email } = req.body;
        const result = await authService.forgotPassword(email);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token } = req.params;
        const { newPassword } = req.body;
        const result = await authService.resetPassword(token as string, newPassword);
        res.json({ message: "Password reset successfully" });
    } catch (err) {
        next(err);
    }
};