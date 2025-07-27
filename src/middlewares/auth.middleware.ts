import { Response, NextFunction } from "express";
import { verifyAccessToken } from "@utils/jwt";
import { AuthRequest } from "../types/index";

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const token =
            req.cookies.access_token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = verifyAccessToken(token);

        req.user = {
            id: decoded.userId,
            role: decoded.role,
        };

        next();
    } catch {
        res.status(401).json({ message: "Unauthorized" });
    }
};
