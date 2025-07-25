import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "@utils/jwt";

export const authMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const token =
            req.cookies.access_token || req.headers.authorization?.split(" ")[1];
        if (!token) return res.status(401).json({ message: "Unauthorized" });

        const decoded = verifyAccessToken(token);
        (req as any).userId = decoded.userId;
        next();
    } catch {
        res.status(401).json({ message: "Unauthorized" });
    }
};
