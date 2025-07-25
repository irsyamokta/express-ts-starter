import rateLimit from "express-rate-limit";
import { Request, Response, NextFunction } from "express";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true, 
    legacyHeaders: false,

    handler: (req: Request, res: Response, next: NextFunction) => {
        res.status(429).json({
            status: "fail",
            message: "Too many requests, please try again later",
        });
    },
});
