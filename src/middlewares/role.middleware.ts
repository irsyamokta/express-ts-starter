import { Request, Response, NextFunction } from "express";
import prisma from "@config/prisma";

export const authorizeRole = (...allowedRoles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = (req as any).userId;
            if (!userId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await prisma.user.findUnique({ where: { id: userId } });
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({ message: "Forbidden: Insufficient role" });
            }

            next();
        } catch (err) {
            next(err);
        }
    };
};
